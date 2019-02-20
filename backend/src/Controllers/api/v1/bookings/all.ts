import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import { ApplicationError } from "@utilities/ForbiddenError";

/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function AllBookingsHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return next(new ApplicationError({ message: "forbidden", code: 401 }));
    }
    if (req.user.AccessLevel !== "admin") {
        next(new ApplicationError({ message: "forbidden", code: 403 }));
    } else {
        const bookings = await Booking.find();
        return res.json({ bookings });
    }
}
