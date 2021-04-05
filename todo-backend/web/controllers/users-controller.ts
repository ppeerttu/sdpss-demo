import { RouterMiddleware, RouteParams } from "../../deps.ts";
import { createUser, findUser, listUsers, deleteUser } from "../../repository.ts";
import { validate } from "../../lib/validator.ts";
import { createSession, removeSession } from "../../lib/session.ts";
import { authConfig } from "../../config/auth.ts";
import { Session } from "../../lib/session.ts";

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
  const session = createSession(
    user,
    new Date(Date.now() + authConfig.sessionDuration * 1000)
  );
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

export const getMe: RouterMiddleware<RouteParams, { session: Session; }> = async (ctx) => {
  const username = ctx.state.session.username;
  const user = await findUser(username);
  if (!user) {
    throw new Error(`User ${username} with id ${ctx.state.session.userId} not found when expected`);
  }
  ctx.response.status = 200;
  ctx.response.body = user;
}

export const deleteMe: RouterMiddleware<RouteParams, { session: Session; }> = async (ctx) => {
  const userId = ctx.state.session.userId;
  await deleteUser(userId);
  ctx.response.status = 204;
  ctx.cookies.delete(authConfig.cookieKey);
}
