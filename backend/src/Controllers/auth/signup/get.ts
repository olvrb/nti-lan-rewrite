import { Request, Response, NextFunction } from "express";
import { User } from "@entities/User";
import { Configuration } from "@config";

/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function SignupGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.user) {
        return res.redirect("/book");
    }
    res.render("auth/signup", {
        title: Configuration.Web.Site.Title,
        path: req.path,
        isLoggedIn: false,
        isAdmin: false
    });
}
