import { Booking } from "@entities/Booking";
import { NextFunction, Request, Response } from "express";
import { IControllerInfo } from "@docs/Interfaces/IContorllerInfo";

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
export async function BookingPaidPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel !== "admin") return res.redirect("/");

    const booking = await Booking.findOne({ where: { Id: req.body.booking } });

    if (booking === undefined) return next(new Error("Ogiltig bokning."));

    booking.SwishId = req.body.reason;
    booking.Paid = true;

    await booking.save();

    console.log(booking);
    await booking.User.SendEmail(
        `Din bokning är nu <strong style="color: green">betald</strong>.`
    );
    return res.redirect("/admin/bookings");
}

export const Info: IControllerInfo = {
    Name: "MarkAsPaid",
    Description: "Mark a booking as paid.",
    Category: "bookings",
    Request: {
        Endpoint: "/api/v1/bookings/paid",
        Method: "POST",
        Parameters: [
            {
                Name: "booking",
                Type: "string",
                Example: "test@example.org",
                Description: "The booking ID to be marked as paid."
            },
            {
                Name: "reason",
                Type: "string",
                Example: "123",
                Description: "Reason (transaction ID or similar)."
            }
        ]
    },
    Response: {
        Redirect: "/book"
    }
};
