import { Configuration } from "@config";
import { NextFunction, Request, Response } from "express";
import { User } from "@entities/User";

/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function VerifyPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/auth/login");
    if (req.user.EmailIsVerified) {
        return res.redirect("/");
    }
    req.user.SendVerificationEmail(req).then((x) =>
        res.render("success", {
            info: "Mailet skickades.",
            path: req.path,
            title: Configuration.Web.Site.Title,
            isAdmin: req.user.AccessLevel === "admin",
            isLoggedIn: req.user ? true : false
        })
    );
}
