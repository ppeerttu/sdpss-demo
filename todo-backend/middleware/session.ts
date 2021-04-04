import { Middleware } from "../deps.ts";
import { authConfig } from "../config/auth.ts";
import { getSession } from "../lib/session.ts";

export const requireSession: Middleware = async (ctx, next) => {
  const sid = ctx.cookies.get(authConfig.cookieKey);
  const session = sid ? getSession(sid) : null;
  if (!session) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
    return;
  }
  ctx.state = {
    ...ctx.state,
    session: session,
  };
  await next();
}

interface SessionMiddlewareOptions {
  includeStartsWith?: string[];
  excludeStartsWith?: string[];
  ignoreCors?: boolean;
}

export const sessionMiddleware = (options: SessionMiddlewareOptions): Middleware => {
  return async (ctx, next) => {
    let checkSession = false;
    const { pathname } = ctx.request.url;
    if (options.ignoreCors === true && ctx.request.method.toLowerCase() === "options") {
      return await next();
    }
    if (options.includeStartsWith) {
      if (options.includeStartsWith.some((path) => pathname.startsWith(path))) {
        checkSession = true;
      }
    } else if (options.excludeStartsWith) {
      if (!options.excludeStartsWith.some((path) => pathname.startsWith(path))) {
        checkSession = true;
      }
    }
    return checkSession ? await requireSession(ctx, next) : await next();
  }
}