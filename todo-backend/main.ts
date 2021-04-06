import app from "./app.ts";
import { serverConfig } from "./config/server.ts";
import { cron } from "./deps.ts";
import { clearExpiredSessions } from "./repository.ts";
import { log } from "./lib/log.ts";

const logger = log.getLogger();

cron("1 */10 * * * *", () => {
  clearExpiredSessions()
    .then((count) => {
      logger.info(`Ran the session store cleanup, removed ${count} sessions...`);
    })
    .catch((e) => {
      logger.error("Faild to clean expired sessions", e);
    });
});


app.listen({ port: serverConfig.port });
