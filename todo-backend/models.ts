interface Persistable<T = string> {
  /**
  * ID of the entity
  */
  id: T;
  /**
   * Created at -timestamp
   */
  createdAt: Date;
}

interface Updateable<T = string> extends Persistable<T> {
  /**
   * Updated at -timestamp
   */
  updatedAt: Date;
}

export interface User {
  /**
   * Name of the user
   */
  username: string;
}

export interface Todo {
  /**
   * Description of the todo item
   */
  description: string;
  /**
   * Is the item completed?
   */
  completed: boolean;
  /**
   * User ID
   */
  userId: string;
}

/**
 * Persisted user entity
 */
export type PersistedUser = User & Persistable;

/**
 * Persisted todo entity
 */
export type PersistedTodo = Todo & Updateable;

export interface Session {
  /**
   * Session ID
   */
  id: string;
  /**
   * Username
   */
  username: string;
  /**
   * User ID
   */
  userId: string;
  /**
   * Created at -timestamp
   */
  createdAt: Date;
  /**
   * Expires at -timestamp
   */
  expiresAt: Date;
}

