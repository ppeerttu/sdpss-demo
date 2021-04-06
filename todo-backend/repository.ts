import { PersistedTodo, PersistedUser, Session } from "./models.ts";
import { Client } from "./deps.ts";
import { connectionString } from "./config/database.ts";

export const client = new Client(connectionString);

await client.connect();

type UsersRow = Omit<PersistedUser, "createdAt"> & { created_at: Date };

type TodosRow = Omit<PersistedTodo, "createdAt" | "updatedAt" | "userId"> & {
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

type SessionRow = Omit<Session, "createdAt" | "expiresAt" | "userId"> & {
  created_at: Date;
  expires_at: Date;
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

const mapRowToSession = ({ created_at, expires_at, user_id, ...rest }: SessionRow): Session => ({
  userId: user_id,
  createdAt: created_at,
  expiresAt: expires_at,
  ...rest
});

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

export const createSession = async (userId: string, expiresAt: Date): Promise<Session> => {
  const res = await client.queryObject<SessionRow>`
    WITH inserted AS (
      INSERT INTO sessions
        (user_id, expires_at, created_at) VALUES (${userId}, ${expiresAt}, CURRENT_TIMESTAMP)
        RETURNING *)
    SELECT inserted.*, u.username FROM inserted, users u WHERE u.id = inserted.user_id
      `;
  return res.rows.map(mapRowToSession)[0];
}

export const getSession = async (sessionId: string, now = new Date()): Promise<Session | null> => {
  const res = await client.queryObject<SessionRow>`
    SELECT s.*, u.username FROM sessions s, users u WHERE s.id = ${sessionId} AND s.expires_at > ${now} AND u.id = s.user_id
  `;
  return res.rows.length === 1 ? res.rows.map(mapRowToSession)[0] : null;
}

export const deleteSession = async (sessionId: string): Promise<boolean> => {
  const res = await client.queryObject`DELETE FROM sessions WHERE id = ${sessionId}`;
  return res.rowCount === 1;
}

export const clearExpiredSessions = async (olderThanTimestamp = new Date()): Promise<number> => {
  const res = await client.queryObject`DELETE FROM sessions WHERE expires_at < ${olderThanTimestamp}`;
  return res.rowCount as number;
}