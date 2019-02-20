import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { User } from "@entities/User";
import { Request, Response } from "express";

/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function UserBookingsGetHandler(req: Request, res: Response) {
    if (!req.user) return res.redirect("/");
    else {
        const bookings = await Booking.find({ where: { User: req.user } });

        // We don't mind passing the user's password, as these objects are only used server-side.
        res.render("user/bookings", {
            title: Configuration.Web.Site.Title,
            path: req.path,
            isLoggedIn: true,
            bookings,
            isAdmin: req.user.AccessLevel === "admin"
        });
    }
}
