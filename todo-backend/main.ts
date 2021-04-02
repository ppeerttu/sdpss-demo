import app from "./app.ts";
import { serverConfig } from "./config/server.ts";

app.listen({ port: serverConfig.port });
