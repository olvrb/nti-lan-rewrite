import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
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
export async function AdminBookingsGetHandler(req: Request, res: Response) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");
    else {
        const bookings = await Booking.find();

        // We don't mind passing the user's password, as these objects are only used server-side.
        res.render("admin/bookings", {
            title: Configuration.Web.Site.Title,
            user: { name: req.user.Name, surname: req.user.Surname },
            bookings,
            path: req.path,
            isLoggedIn: true,
            isAdmin: req.user.AccessLevel === "admin"
        });
    }
}
