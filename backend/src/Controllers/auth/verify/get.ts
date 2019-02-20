import { Configuration } from "@config";
import { NextFunction, Request, Response } from "express";

/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function VerifyGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/auth/login");
    if (req.user.EmailIsVerified) {
        return res.redirect("/");
    }

    res.render("auth/verify", {
        path: req.path,
        isLoggedIn: true,
        title: Configuration.Web.Site.Title,
        isAdmin: req.user.AccessLevel === "admin"
    });
}
