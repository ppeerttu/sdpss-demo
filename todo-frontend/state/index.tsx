import React, { useContext } from "react";

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
  authPending: boolean;
}

const AppContext = React.createContext<AppState>(null);

export function AppStateProvider({ children }) {
  const state: AppState = {
    user: null,
    todos: [],
    authPending: false,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppState(): AppState {
  return useContext(AppContext);
}
