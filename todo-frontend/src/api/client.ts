import axios from "axios";
import { AppUser, Todo } from "../state";

export class ApiClient {
  private client = axios.create({
    timeout: 5000,
    withCredentials: true,
  });

  public getMe(): Promise<AppUser | null> {
    return this.client
      .get("/api/users/me")
      .then((res) => res.data as AppUser)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          if (err.response && err.response.status === 401) {
            return null;
          }
        }
        throw err;
      });
  }

  public signIn(username: string): Promise<AppUser> {
    return this.client.post("/api/auth/sign-in", { username }).then((res) => res.data as AppUser);
  }

  public async signOut(): Promise<void> {
    await this.client.post("/api/auth/sign-out");
  }

  public getTodos(): Promise<Todo[]> {
    return this.client.get("/api/todos").then((res) => res.data as Todo[]);
  }

  public completeTodo(todoId: string, completed = true): Promise<Todo> {
    return this.client.put(`/api/todos/${todoId}`, { completed }).then((res) => res.data as Todo);
  }

  public createTodo(description: string, deadline: Date | null = null): Promise<Todo> {
    return this.client
      .post("/api/todos", { description, deadline })
      .then((res) => res.data as Todo);
  }

  public async deleteTodo(todoId: string): Promise<void> {
    await this.client.delete(`/api/todos/${todoId}`);
  }

  public deleteMe(): Promise<void> {
    return this.client.delete("/api/users/me");
  }
}
