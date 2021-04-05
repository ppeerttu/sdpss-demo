import React, { useCallback, useContext, useState } from "react";

import { ApiClient } from "../api/client";

export interface AppUser {
  id: string;
  username: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  user: AppUser | null;
  todos: Todo[];
  getMe(): Promise<AppUser | null>;
  signIn(username: string): Promise<AppUser>;
  signOut(): Promise<void>;
  getTodos(): Promise<Todo[]>;
  postTodo(description: string): Promise<Todo>;
  deleteTodo(todoId: string): Promise<void>;
  completeTodo(todoId: string, completed?: boolean): Promise<Todo>;
}

const AppContext = React.createContext<AppState>(null);
const api = new ApiClient();

export function AppStateProvider({ children }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const state: AppState = {
    user,
    todos,
    getMe: useCallback(() => {
      return api.getMe().then((user) => {
        setUser(user);
        return user;
      });
    }, []),
    signIn: useCallback((username) => {
      return api.signIn(username).then((user) => {
        setUser(user);
        return user;
      });
    }, []),
    signOut: useCallback(() => {
      return api.signOut().then(() => {
        setUser(null);
      });
    }, []),
    getTodos: useCallback(() => {
      return api.getTodos().then((todos) => {
        setTodos(todos);
        return todos;
      });
    }, []),
    postTodo: useCallback((description: string) => {
      return api.createTodo(description).then((todo) => {
        setTodos((todos) => [todo, ...todos]);
        return todo;
      });
    }, []),
    deleteTodo: useCallback((todoId: string) => {
      return api.deleteTodo(todoId).then(() => {
        setTodos((todos) => todos.filter((t) => t.id !== todoId));
      });
    }, []),
    completeTodo: useCallback((todoId: string, completed?: boolean) => {
      return api.completeTodo(todoId, completed).then((todo) => {
        setTodos((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
        return todo;
      });
    }, []),
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppState(): AppState {
  return useContext(AppContext);
}