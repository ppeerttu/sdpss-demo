import { Environment } from "../lib/env.ts";

export const redisConfig = {
  hostname: Environment.getString("REDIS_HOST", "127.0.0.1"),
  port: Environment.getInteger("REDIS_PORT", 6379),
  maxRetryCount: Environment.getInteger("REDIS_CONN_RETRY_COUNT", 10),
};
