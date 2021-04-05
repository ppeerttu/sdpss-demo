import { Environment } from "../lib/env.ts";

const HOUR = 60 * 60;

const DEFAULT_SESSION_DURATION = HOUR * 2;

export const authConfig = {
  cookieKey: "sid",
  sessionDuration: Environment.getInteger("SESSION_DURATION_SECONDS", DEFAULT_SESSION_DURATION)
};
