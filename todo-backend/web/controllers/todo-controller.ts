import { RouterMiddleware, RouteParams } from "../../deps.ts";
import { listTodos, createTodo, deleteTodo as removeTodo, completeTodo } from "../../repository.ts";
import { validate } from "../../lib/validator.ts";
import { Session } from "../../models.ts";
import { log } from "../../lib/log.ts";

const logger = log.getLogger();

export const getTodos: RouterMiddleware<RouteParams, { session: Session }> = async (ctx) => {
  const todos = await listTodos(ctx.state.session.userId);
  ctx.response.body = todos;
};

export const postTodo: RouterMiddleware<RouteParams, { session: Session }> = async (ctx) => {
  const valid = await validate(ctx, [{ key: "description", type: "string"}, { key: "deadline", type: "string", optional: true }]);
  if (!valid) {
    ctx.response.status = 422;
    ctx.response.body = { "error": "Unprocessable entity" };
    return;
  }
  const body = await ctx.request.body({ type: "json" }).value;
  // TODO: This is kind of dangerous. The 'deadline' should be validated first - this method does not
  // handle invalid formats.
  const deadline = body.deadline ? new Date(body.deadline) : null;
  logger.info(`Deadline: ${deadline}, body: ${JSON.stringify(body, null, 4)}`)
  const todo = await createTodo(body.description, ctx.state.session.userId, deadline);
  ctx.response.status = 201;
  ctx.response.body = todo;
}

export const deleteTodo: RouterMiddleware<RouteParams, { session: Session }> = async (ctx) => {
  const todoId = ctx.params.todoId as string;
  // In reality we would check if this user has access to the todo, but let's ignore that for now...
  await removeTodo(todoId);
  ctx.response.status = 204;
}

export const updateTodo: RouterMiddleware = async (ctx) => {
  const valid = await validate(ctx, [{ key: "completed", type: "boolean" }]);
  const todoId = ctx.params.todoId as string;
  // In reality we would check if this user has access to the todo, but let's ignore that for now...
  const body = await ctx.request.body({ type: "json" }).value;
  const completed = body.completed as boolean;
  const updated = await completeTodo(todoId, completed);

  if (!updated) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: `No todo found with id ${todoId}`
    };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = updated;
}
