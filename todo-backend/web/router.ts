import { Router } from "../deps.ts";
import { getTodos, postTodo, deleteTodo, updateTodo } from "./controllers/todo-controller.ts";
import { authenticate, signOut, getMe, deleteMe } from "./controllers/users-controller.ts";

export const router = new Router();

// Todos
router.get("/api/todos", getTodos);
router.post("/api/todos", postTodo);
router.delete("/api/todos/:todoId", deleteTodo);
router.put("/api/todos/:todoId", updateTodo);

// Users
router.get("/api/users/me", getMe);
router.delete("/api/users/me", deleteMe);

// Auth
router.post("/api/auth/sign-in", authenticate);
router.post("/api/auth/sign-out", signOut);
