import { PersistedTodo, PersistedUser, Session } from "./models.ts";
import { Client, connect } from "./deps.ts";
import { connectionString } from "./config/database.ts";
import { redisConfig } from "./config/redis.ts";

export const client = new Client(connectionString);

await client.connect();

const redis = await connect(redisConfig);

type UsersRow = Omit<PersistedUser, "createdAt"> & { created_at: Date };

type TodosRow = Omit<PersistedTodo, "createdAt" | "updatedAt" | "userId"> & {
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

// Snake case data to camel case mappers

const mapRowToUser = ({ created_at, ...rest }: UsersRow): PersistedUser => ({
  ...rest,
  createdAt: created_at,
});

const mapRowToTodo = (
  { created_at, updated_at, user_id, ...rest }: TodosRow,
): PersistedTodo => ({
  ...rest,
  createdAt: created_at,
  updatedAt: updated_at,
  userId: user_id,
});

/**
 * Check the health of the persistence storages.
 */
export const healthCheck = async (): Promise<void> => {
  await redis.ping();
  await client.queryObject`SELECT 1 + 1;`;
}

// Todos

export const listTodos = async (userId?: string): Promise<PersistedTodo[]> => {
  const res = await (
    userId
      ? client.queryObject<TodosRow>
        `SELECT * FROM todos WHERE user_id = ${userId}`
      : client.queryObject<TodosRow>`SELECT * FROM todos`
  );
  return res.rows.map(mapRowToTodo);
};

export const createTodo = async (description: string, userId: string): Promise<PersistedTodo> => {
  const res = await client.queryObject<TodosRow>`
    INSERT INTO todos (created_at, updated_at, description, user_id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${description}, ${userId}) RETURNING *
  `;
  return res.rows.map(mapRowToTodo)[0];
}

export const completeTodo = async (
  todoId: string,
  completed = true,
): Promise<PersistedTodo | null> => {
  const res = await client.queryObject<TodosRow>`
        UPDATE todos SET completed = ${completed} WHERE id = ${todoId} RETURNING *
    `;
  return res.rows.length === 1 ? res.rows.map(mapRowToTodo)[0] : null;
};

export const deleteTodo = async (todoId: string): Promise<void> => {
  const res = await client.queryObject`DELETE FROM todos WHERE id = ${todoId}`;
};

// Users

export const listUsers = async (): Promise<PersistedUser[]> => {
  const res = await client.queryObject<UsersRow>`SELECT * FROM users`;
  return res.rows.map(mapRowToUser);
};

export const createUser = async (username: string): Promise<PersistedUser> => {
  const res = await client.queryObject<UsersRow>`
        INSERT INTO users (username, created_at) VALUES (${username}, CURRENT_TIMESTAMP) RETURNING *
    `;
  return res.rows.map(mapRowToUser)[0];
};

export const findUser = async (
  username: string,
): Promise<PersistedUser | null> => {
  const res = await client.queryObject<UsersRow>
    `SELECT * FROM users WHERE username = ${username}`;
  return res.rows.length === 1 ? res.rows.map(mapRowToUser)[0] : null;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const res = await client.queryObject`DELETE FROM users WHERE id = ${userId}`;
};

// Sessions

export const createSession = async (session: Session): Promise<Session> => {
  const timeoutMs = session.expiresAt.getTime() - Date.now();
  await redis.set(`session:${session.id}`, JSON.stringify(session), { px: timeoutMs });
  return session;
}

export const getSession = async (sessionId: string): Promise<Session | null> => {
  const session = await redis.get(`session:${sessionId}`);
  return session ? deserializeSession(session) : null;
}

export const deleteSession = async (sessionId: string): Promise<boolean> => {
  const count = await redis.del(`session:${sessionId}`);
  return count > 0;
}

function deserializeSession(session: string): Session {
  const deserialized = JSON.parse(session) as Session;
  return {
    ...deserialized,
    expiresAt: new Date(deserialized.expiresAt),
    createdAt: new Date(deserialized.createdAt),
  };
}
