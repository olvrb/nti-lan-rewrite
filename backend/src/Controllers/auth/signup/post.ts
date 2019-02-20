import { Request, Response, NextFunction } from "express";
import passport = require("passport");
import { User } from "@entities/User";
import { Logger } from "@utilities/Logger";
import { randomBytes } from "crypto";
import Mailgun from "mailgun-js";
import { Configuration } from "@config";
import { ApplicationError } from "@utilities/ForbiddenError";
const mailgunClient = Mailgun({
    apiKey: Configuration.Mail.ApiKey,
    domain: Configuration.Mail.Domain
});

/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * // TODO: update apiParams
 * @apiParam {string} [name] Name
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function SignupPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const {
        email,
        password,
        nationalId,
        name,
        surname,
        phone,
        adultPhone,
        address,
        postcode,
        city
    } = req.body;
    if (!User.ValidateEmail(email)) {
        return res.status(400).send("ogiltig email");
    }
    if (!User.ValidatePassword(password)) {
        return res.status(400).send("ogiltigt lösenord (minst 8 tecken)");
    }
    if (!User.ValidateNationalId(nationalId)) {
        return res.status(400).send("ogiltigt personnummer (ÅÅMMDD-XXXX)");
    }
    if (!User.ValidatePhone(phone) && !User.ValidatePhone(adultPhone)) {
        return res
            .status(400)
            .send(
                "ogiltigt telefonnummer eller anhörig telefonnummer (ex. 0712345678)"
            );
    }
    if (!User.ValidatePostcode(postcode)) {
        return res.status(400).send("ogiltig postaddress (ex. 11266)");
    }
    const oldUser = await User.findOne({ where: { Email: email } });
    if (oldUser !== undefined) {
        return res.redirect("/auth/signup?invalidForm");
    }

    const user = new User();
    user.Email = email;
    user.Password = User.HashPassword(password);
    user.NationalId = nationalId;
    user.Name = name;
    user.Surname = surname;
    user.PhoneNumber = phone;
    user.AdultPhoneNumber = adultPhone;
    user.Address = address;
    user.Postcode = postcode;
    user.City = city;
    user.Bookings = [];
    user.AccessLevel = "pleb";
    user.EmailIsVerified = false;
    user.EmailVerificationToken = randomBytes(48).toString("hex");

    try {
        await user.save();
    } catch (error) {
        Logger.error(JSON.stringify(error));
        return next(
            new ApplicationError({
                code: 500,
                message: "internal server error"
            })
        );
    }

    user.SendVerificationEmail(req)
        .then((x) =>
            res.json({
                status: true,
                message: "Successfully logged in."
            })
        )
        .catch((err) => {
            Logger.error(err);
            return next(
                new ApplicationError({
                    code: 500,
                    message: "internal server error"
                })
            );
        });
}
