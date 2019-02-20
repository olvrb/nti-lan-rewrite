import { Configuration } from "@config";
import { Session } from "@entities/Session";
import { json, urlencoded } from "body-parser";
import express from "express";
import session from "express-session";
import passport = require("passport");
import { join } from "path";
import { getConnection, Repository } from "typeorm";
import { SessionEntity, TypeormStore } from "typeorm-store";
import uuid from "uuid/v4";
import ESwaggerUI from "swagger-ui-express";
import swaggerDoc = require("../swagger.json");

import { app } from "../Index";
import { Logger } from "../Utilities/Logger";
import { AuthMiddleware } from "./Auth/Index";
import { LoggerMiddleware } from "./Logger/Index";

export function BindMiddleware() {
    Logger.info("Binding middleware.");
    app.enable("trust proxy");
    app.use(LoggerMiddleware);
    app.use(
        session({
            genid: () => uuid(),
            secret: Configuration.Web.Secret,
            resave: true,
            store: new TypeormStore({
                // wtf typescript
                repository: (getConnection().getRepository(
                    Session
                ) as unknown) as Repository<SessionEntity>
            }),
            saveUninitialized: true,
            cookie: {
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 1000 // 24 hours.
            }
        })
    );
    app.use(json()); // for parsing application/json
    app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use("/public", express.static(join(__dirname, "../../public")));
    app.use(AuthMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(
        "/swagger",
        ESwaggerUI.serve,
        ESwaggerUI.setup(swaggerDoc, { explorer: true })
    );
}
