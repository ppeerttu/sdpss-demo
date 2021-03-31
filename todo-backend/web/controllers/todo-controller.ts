import { RouterMiddleware } from "../../deps.ts";

const TODOS = [
    {
        id: 1,
        message: "Take out the trash",
        done: false,
    },
    {
        id: 2,
        message: "Shop for groceries",
        done: false,
    }
];

export const listTodos: RouterMiddleware = (ctx) => {
    ctx.response.body = TODOS;
}
