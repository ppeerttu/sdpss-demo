import { RouterMiddleware } from "../../deps.ts";
import { createUser, findUser, listUsers } from "../../repository.ts";
import { validate } from "../../lib/validator.ts";
import { createSession, removeSession } from "../../lib/session.ts";
import { authConfig } from "../../config/auth.ts";

export const getUsers: RouterMiddleware = async (ctx) => {
  const users = await listUsers();
  ctx.response.body = users;
};

export const authenticate: RouterMiddleware = async (ctx) => {
  const valid = await validate(ctx, [{ key: "username", type: "string" }]);
  if (!valid) {
    ctx.response.status = 422;
    ctx.response.body = { "error": "Unprocessable entity" };
    return;
  }
  const body = await ctx.request.body({ type: "json" }).value;
  const user = (await findUser(body.username)) ||
    (await createUser(body.username));
  ctx.response.body = user;
  const session = createSession(user);
  ctx.cookies.set(authConfig.cookieKey, session.sessionId, {
    expires: session.expires,
    sameSite: true,
    httpOnly: true,
  });
};

export const signOut: RouterMiddleware = (ctx) => {
  const sid = ctx.cookies.get(authConfig.cookieKey);
  if (sid) {
    // Ignore the result for now
    removeSession(sid);
  }
  ctx.response.status = 204;
  ctx.cookies.delete(authConfig.cookieKey);
}
