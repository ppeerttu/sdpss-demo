import { PersistedTodo, PersistedUser } from "./models.ts";
import { Client } from "./deps.ts";
import { connectionString } from "./config/database.ts";

export const client = new Client(connectionString);

await client.connect();

type UsersRow = Omit<PersistedUser, "createdAt"> & { created_at: Date };

type TodosRow = Omit<PersistedTodo, "createdAt" | "updatedAt"> & {
  created_at: Date;
  updated_at: Date;
};

const mapRowToUser = ({ created_at, ...rest }: UsersRow): PersistedUser => ({
  ...rest,
  createdAt: created_at,
});

const mapRowToTodo = (
  { created_at, updated_at, ...rest }: TodosRow,
): PersistedTodo => ({
  ...rest,
  createdAt: created_at,
  updatedAt: updated_at,
});

export const listTodos = async (userId?: string): Promise<PersistedTodo[]> => {
  const res = await (
    userId
      ? client.queryObject<TodosRow>
        `SELECT * FROM todos WHERE user_id = ${userId}`
      : client.queryObject<TodosRow>`SELECT * FROM todos`
  );
  return res.rows.map(({ created_at, updated_at, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
  }));
};

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
