import { User } from "@entities/User";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export async function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, User.Authenticate)
    );
    passport.serializeUser((user: User, done) => {
        done(null, user.Id);
    });
    passport.deserializeUser(async (id, done) => {
        done(null, await User.findOne({ where: { Id: id } }));
    });
    next();
}
