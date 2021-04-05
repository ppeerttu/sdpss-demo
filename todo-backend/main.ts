import app from "./app.ts";
import { serverConfig } from "./config/server.ts";
import { cron } from "./deps.ts";
import { cleanSessionStore } from "./lib/session.ts";
import { log } from "./lib/log.ts";

const logger = log.getLogger();

cron("1 */1 * * * *", () => {
  const cleanedSessions = cleanSessionStore();
  logger.info(`Ran the session store cleanup, removed ${cleanedSessions.length} sessions...`);
});


app.listen({ port: serverConfig.port });
