import { uuidv4 } from "../deps.ts";
import { PersistedUser } from "../models.ts";

const HOUR = 1000 * 60 * 60;

const SESSION_DURATION = HOUR * 2;

export interface Session {
  /**
   * Username
   */
  username: string;
  /**
   * User ID
   */
  userId: string;
  /**
   * Session ID
   */
  sessionId: string;
  /**
   * Authenticated at -timestamp
   */
  authenticatedAt: Date;
  /**
   * Expires at -timestamp
   */
  expires: Date;
}

const sessionStore: Map<string, Session> = new Map();

/**
 * Get a session by id.
 * 
 * @param sessionId Session ID
 * @returns The session if found
 */
export const getSession = (sessionId: string): Session | null => {
  const session = sessionStore.get(sessionId);
  if (!session) {
    return null;
  }
  if (isExpired(session)) {
    removeSession(session.sessionId);
    return null;
  }
  return session;
}

/**
 * Create a new session for user.
 *
 * @param user User
 * @returns Created session
 */
export const createSession = (user: PersistedUser): Session => {
  const session: Session = {
    userId: user.id,
    username: user.username,
    sessionId: uuidv4.generate(),
    authenticatedAt: new Date(),
    expires: new Date(Date.now() + SESSION_DURATION)
  };
  sessionStore.set(session.sessionId, session);
  return session;
}

/**
 * Clean a session if it is expired.
 * 
 * @param sessionId Session ID
 * @returns True if session was removed,
 * false otherwise
 */
export const removeSession = (sessionId: string): boolean => {
  return sessionStore.delete(sessionId);
}
/**
 * Is the session expired?
 * 
 * @param session Session
 * @param now Current timestamp
 * @returns True if expired
 */
const isExpired = (session: Session, now = Date.now()): boolean => session.expires.getTime() < now;

/**
 * Clean the session store from expired sessions.
 * 
 * @returns Cleaned session IDs
 */
export const cleanSessionStore = (): string[] => {
  const expired: string[] = [];
  const now = Date.now();
  for (const [key, session] of sessionStore.entries()) {
    if (isExpired(session, now)) {
      expired.push(key);
    }
  }
  for (const key of expired) {
    sessionStore.delete(key);
  }
  return expired;
}
