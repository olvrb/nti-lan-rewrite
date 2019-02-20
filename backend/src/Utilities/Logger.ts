import { format, transports, createLogger } from "winston";
const Logger = createLogger({
    level: "debug",
    format: format.simple(),
    transports: [new transports.Console()]
});

export { Logger };
