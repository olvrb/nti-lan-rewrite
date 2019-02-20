import "reflect-metadata";
import { createConnection } from "typeorm";

import { Configuration } from "@config";
import { join } from "path";

export function connect() {
    return createConnection({
        entities: [join(__dirname, "/Entities/*.js")],
        ...Configuration.Database
    });
}
