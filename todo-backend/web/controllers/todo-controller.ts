import { RouterMiddleware } from "../../deps.ts";
import { listTodos, createTodo } from "../../repository.ts";
import { validate } from "../../lib/validator.ts";

export const getTodos: RouterMiddleware = async (ctx) => {
  const todos = await listTodos();
  ctx.response.body = todos;
};

export const postTodo: RouterMiddleware = async (ctx) => {
  const valid = await validate(ctx, [{ key: "description", type: "string" }]);
  if (!valid) {
    ctx.response.status = 422;
    ctx.response.body = { "error": "Unprocessable entity" };
    return;
  }
  const body = await ctx.request.body({ type: "json" }).value;
}
