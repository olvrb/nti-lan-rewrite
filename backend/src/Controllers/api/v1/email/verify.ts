import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { NextFunction, Request, Response } from "express";
import SeatsioClient from "seatsio";
import { Logger } from "@utilities/Logger";
import { User } from "@entities/User";

const client = new SeatsioClient(Configuration.SeatsIO.PrivateKey);
/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiParam booking
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function EmailVerifyGetHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.query.token;
    if (!token) {
        return next(new Error("Ogiltig verifikations token."));
    }

    const user = await User.findOne({
        where: { EmailVerificationToken: token }
    });
    if (user === undefined) {
        return next(new Error("Ogiltig verifikations token."));
    }

    user.EmailIsVerified = true;
    user.EmailVerificationToken = "";
    await user.save();
    return res.render("success", {
        info: "Email verifierad.",
        path: req.path,
        title: Configuration.Web.Site.Title,
        isAdmin: req.user.AccessLevel === "admin",
        isLoggedIn: req.user ? true : false
    });
}
