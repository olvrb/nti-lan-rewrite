import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { NextFunction, Request, Response } from "express";
import SeatsioClient from "seatsio";
import { Logger } from "@utilities/Logger";

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
export async function BookingRemovePostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) return res.redirect("/");
    if (req.user.AccessLevel === "admin") {
        const booking = await Booking.findOne({
            where: { Id: req.body.booking }
        });

        if (booking === undefined) {
            return next(new Error("Ogiltig bokning."));
        }

        if (booking.Type === "seat") {
            await client.events.release(
                Configuration.SeatsIO.EventKey,
                booking.SeatId
            );
        }
        await booking.remove();
        return res.redirect("/admin/bookings");
    } else {
        const booking = await Booking.findOne({
            where: { User: req.user, Id: req.body.booking }
        });
        if (booking === undefined) {
            return next(new Error("Ogiltig bokning."));
        }
        if (booking.Type === "seat") {
            await client.events.release(
                Configuration.SeatsIO.EventKey,
                booking.SeatId
            );
        }

        await booking.remove();
        return res.redirect("/user/bookings");
    }
}
