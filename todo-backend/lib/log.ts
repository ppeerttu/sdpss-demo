import { log as stdLog } from "../deps.ts";

await stdLog.setup({
    handlers: {
        console: new stdLog.handlers.ConsoleHandler("DEBUG", {
            formatter: "{datetime} - {level} - {msg}"
        })
    },
    loggers: {
        default: {
            level: "DEBUG",
            handlers: ["console"]
        }
    }
});

export const log = stdLog;
