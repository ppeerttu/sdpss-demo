import { Application, Router } from "../deps.ts";
import { listTodos } from "./controllers/todo-controller.ts";

export const router = new Router();

// Todos
router.get("/api/todos", listTodos);

