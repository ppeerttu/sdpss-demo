import React, { useCallback, useContext, useEffect, useState } from "react";

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
  deadline: string;
}

export interface AppState {
  user: AppUser | null;
  todos: Todo[];
  completedTodos: Todo[];
  getMe(): Promise<AppUser | null>;
  signIn(username: string): Promise<AppUser>;
  signOut(): Promise<void>;
  getTodos(): Promise<Todo[]>;
  postTodo(description: string, deadline?: Date | null): Promise<Todo>;
  deleteTodo(todoId: string): Promise<void>;
  completeTodo(todoId: string, completed?: boolean): Promise<Todo>;
  deleteMe(): Promise<void>;
}

const AppContext = React.createContext<AppState>(null);
const api = new ApiClient();

export function AppStateProvider({ children }): JSX.Element {
  const [user, setUser] = useState<AppUser | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const [nonCompleted, completed] = zipArray(allTodos, (t) => t.completed);

    const sortFn = (a: Todo, b: Todo) => {
      if (a.deadline && b.deadline) {
        return a.deadline < b.deadline ? -1 : 1;
      }
      if (a.deadline) {
        return -1;
      }
      if (b.deadline) {
        return 1;
      }
      return a.updatedAt < b.updatedAt ? -1 : 1;
    };

    setTodos(nonCompleted.sort(sortFn));
    setCompletedTodos(completed.sort(sortFn));
  }, [setTodos, setCompletedTodos, allTodos]);

  const state: AppState = {
    user,
    todos,
    completedTodos,
    deleteMe: useCallback(() => {
      return api.deleteMe().then(() => setUser(null));
    }, []),
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
        setAllTodos(todos);
        return todos;
      });
    }, []),
    postTodo: useCallback((description: string, deadline?: Date | null) => {
      return api.createTodo(description, deadline).then((todo) => {
        setAllTodos((todos) => [todo, ...todos]);
        return todo;
      });
    }, []),
    deleteTodo: useCallback((todoId: string) => {
      return api.deleteTodo(todoId).then(() => {
        setAllTodos((todos) => todos.filter((t) => t.id !== todoId));
      });
    }, []),
    completeTodo: useCallback((todoId: string, completed?: boolean) => {
      return api.completeTodo(todoId, completed).then((todo) => {
        setAllTodos((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
        return todo;
      });
    }, []),
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppState(): AppState {
  return useContext(AppContext);
}

function zipArray<T>(vals: T[], fn: (val: T) => boolean): [T[], T[]] {
  const left: T[] = [];
  const right: T[] = [];
  for (const val of vals) {
    if (fn(val)) {
      right.push(val);
    } else {
      left.push(val);
    }
  }
  return [left, right];
}
