import { RouterMiddleware } from "../../deps.ts";
import { listTodos } from "../../repository.ts";

export const getTodos: RouterMiddleware = async (ctx) => {
    const todos = await listTodos();
    ctx.response.body = todos;
}
