import { RouterMiddleware } from "../../deps.ts";
import { listUsers, findUser, createUser } from "../../repository.ts";
import { validate } from "../../lib/validator.ts";

export const getUsers: RouterMiddleware = async (ctx) => {
    const users = await listUsers();
    ctx.response.body = users;
}

export const authenticate: RouterMiddleware = async (ctx) => {
    const valid = await validate(ctx, [{ key: "username", type: "string" }]);
    if (!valid) {
        ctx.response.status = 422;
        ctx.response.body = { "error": "Unprocessable entity" };
        return;
    }
    const body = await ctx.request.body({ type: "json" }).value;
    const user = (await findUser(body.username)) || (await createUser(body.username));
    ctx.response.body = user;
}
