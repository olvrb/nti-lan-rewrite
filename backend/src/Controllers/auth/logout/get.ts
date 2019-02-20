import { Request, Response, NextFunction } from "express";
import { User } from "@entities/User";
import { Configuration } from "@config";

/**
 * @api {get} /auth/signout
 * @apiName Sign out.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function LogoutGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.user && req.session) {
        req.session.destroy((err) => err);
        req.logout();
        return res.redirect("/");
    }
}
