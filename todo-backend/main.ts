import { Application } from "./deps.ts";
import { log } from "./lib/log.ts";

import { router } from "./web/router.ts";

const logger = log.getLogger();

const app = new Application();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    logger.info(`${ctx.request.method} ${ctx.request.url.pathname} - ${ctx.response.status} in ${Date.now() - start}ms`)
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
