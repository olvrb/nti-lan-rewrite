import { Configuration } from "@config";
import { Booking } from "@entities/Booking";
import { Logger } from "@utilities/Logger";
import { NextFunction, Request, Response } from "express";
import SeatsioClient from "seatsio";
import { IControllerInfo } from "@docs/Interfaces/IContorllerInfo";
import { ApplicationError } from "@utilities/ForbiddenError";

const client = new SeatsioClient(Configuration.SeatsIO.PrivateKey);
/**
 * @api {get} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function BookPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return next(new ApplicationError({ code: 401, message: "forbidden" }));
    }
    if (!req.user.EmailIsVerified) {
        return next(new ApplicationError({ code: 403, message: "forbidden" }));
    }

    if ((await req.user.Bookings).length >= 2) {
        return next(new Error("Du kan inte boka fler än två platser."));
    }
    const seat = req.body.seat;
    // const referrer = req.body.referrer;
    const booking = new Booking();
    booking.Paid = false;
    booking.User = req.user;
    booking.SwishId = "";

    if (seat !== "") {
        // Book seat
        try {
            await client.events.book(Configuration.SeatsIO.EventKey, [
                {
                    objectId: seat,
                    extraData: {
                        name: `${req.user.Name} ${req.user.Surname}`
                    }
                }
            ]);
        } catch (error) {
            Logger.error(JSON.stringify(error));
            return next(
                new Error("Failed to reserve seat, probably already reserved.")
            );
        }
        booking.SeatId = seat;
        booking.Type = "seat";
        booking.Price = 60;
    } else {
        booking.SeatId = "";
        booking.Type = "entry";
        booking.Price = 30;
    }
    await booking.save();
    return res.json({
        status: true,
        message: "Successfully booked a seat/entry."
    });
}

export const Info: IControllerInfo = {
    Name: "Book",
    Description: "Book a seat",
    Category: "bookings",
    Request: {
        Endpoint: "/api/v1/bookings/book",
        Method: "POST",
        Parameters: [
            { Name: "email", Type: "string", Example: "test@example.org" }
        ]
    },
    Response: {
        Redirect: "/user/bookings"
    }
};
