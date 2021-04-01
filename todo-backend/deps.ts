/**
* We re-export all dependencies from here so the other project files
* won't have to deal with external sources directly.
*/
export { Application,Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
export type { RouterMiddleware } from "https://deno.land/x/oak@v6.5.0/mod.ts";
export * as log from "https://deno.land/std@0.91.0/log/mod.ts";
export { Client } from "https://deno.land/x/postgres@@v0.8.0/mod.ts";
