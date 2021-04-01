import { Client } from "../deps.ts";
import { connectionString } from "../config/database.ts";

export const client = new Client(connectionString);
