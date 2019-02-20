// tslint:disable-next-line
require("module-alias/register");
import { Configuration } from "@config";
import { Logger } from "@utilities/Logger";
import express from "express";
import { join } from "path";

import { BindControllers } from "./Controllers/Index";
import { connect } from "./Database/Index";
import { BindMiddleware } from "./Middleware/Index";

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));

const port = Configuration.Web.Port;
connect()
    .then(() => {
        // Routes
        BindMiddleware();
        BindControllers();
        app.listen(port, () => {
            Logger.info(`Listening on port ${port}: http://localhost:${port}`);
        });
    })
    .catch(Logger.error);
export { app };
