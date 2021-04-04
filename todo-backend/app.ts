import { Application, oakCors } from "./deps.ts";
import { log } from "./lib/log.ts";

import { router } from "./web/router.ts";
import { sessionMiddleware } from "./middleware/session.ts";

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

app.use(oakCors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(sessionMiddleware({
  excludeStartsWith: ["/auth"],
  ignoreCors: true,
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
