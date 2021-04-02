import { Router } from "../deps.ts";
import { getTodos } from "./controllers/todo-controller.ts";
import { authenticate, signOut, getUsers } from "./controllers/users-controller.ts";

export const router = new Router();

// Todos
router.get("/api/todos", getTodos);

// Users
router.get("/api/users", getUsers);

// Auth
router.post("/auth/sign-in", authenticate);
router.post("/auth/sign-out", signOut);
