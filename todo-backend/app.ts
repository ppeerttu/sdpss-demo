import { Application, oakCors } from "./deps.ts";
import { log } from "./lib/log.ts";

import { router } from "./web/router.ts";
import { sessionMiddleware } from "./middleware/session.ts";
import { serverConfig } from "./config/server.ts";

const logger = log.getLogger();

const app = new Application();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  logger.info(
    `${ctx.request.method} ${ctx.request.url.pathname} - ${ctx.response.status} in ${Date
      .now() - start}ms`,
  );
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.error("Uncaught exception", e);
  }
});



if (serverConfig.cors.enabled) {
  app.use(oakCors({
    origin: serverConfig.cors.origin,
    credentials: true,
  }));
}

app.use(sessionMiddleware({
  excludeStartsWith: ["/auth"],
  ignoreCors: serverConfig.cors.enabled,
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  logger.info(
    `Listening on ${secure ? "https" : "http"}://${hostname ||
      "localhost"}:${port}`,
  );
});

export default app;
