import { Environment } from "../lib/env.ts";

export const config = {
    user: Environment.getString("POSTGRES_USER", "todo-app"),
    password: Environment.getString("POSTGRES_PASSWORD", "todo-app"),
    port: Environment.getInteger("POSTGRES_PORT", 5432),
    host: Environment.getString("POSTGRES_HOST", "localhost"),
    database: Environment.getString("POSTGRES_DB", "todo-app-dev"),
};

export const connectionString = Environment.getString(
    "DATABASE_URL",
    `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`
);
