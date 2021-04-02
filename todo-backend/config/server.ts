import { Environment } from "../lib/env.ts";

export const serverConfig = {
  port: Environment.getInteger("PORT", 8080),
};
