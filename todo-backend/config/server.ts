import { Environment } from "../lib/env.ts";

export const serverConfig = {
  port: Environment.getInteger("PORT", 8080),
  cors: {
    enabled: Environment.getBoolean("CORS_ENABLED", true),
    origin: Environment.getString("CORS_ORIGIN", "http://localhost:3000"),
  }
};
