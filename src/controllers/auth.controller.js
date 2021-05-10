const userMailing = require("../services/user.mailing");
const { validationResult } = require('express-validator');
const passport = require("passport");
const User = require("../models/user.model");


exports.register = async (req, res, next) => {

    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) throw { code: 400, message: errors }
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            adress: req.body.adress,
            phone: req.body.phone,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            email: req.body.email,
            zipcode: req.body.zipcode,
            badge: 'client',
            isVerified: false
        });
        if (req.files) if (req.files.photo) {
            user.photo = new Date().getTime() + "." + req.files.photo.name.split('.').pop().toLowerCase();
        }

        //let password = crypto.MD5(req.body.password);
        await User.register(user, req.body.password, async function (err) {
            if (err) {
                if (err.kind === "UserExistsError")
                    return res.status(501).json({ success: false, message: "A user with the given e-mail is already registered", data: req.body });
                else {
                    return res.status(501).json({ success: false, message: err.message, data: req.body });
                }

            }
            //await userMailing.sendConfirmationAccount(user, config.AUTH_CONFIRMATIONPASSWORD_BASEURL, user._id);
            return res.status(200).json({
                success: true,
                message: "User registred .",
                data: { user: user, token: user.generateJWT() }
            });
        });
    } catch (error) {
        console.log(error)
        return res.status(error.code || 500).json({ success: false, message: error.message || "Unknown internal server error ! ." });
    }
};

exports.login = async (req, res, next) => {
    console.log("LOGIN USER..." + req.body.email);

    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) throw { code: 400, message: errors }

        passport.authenticate('local', { usernameField: 'email', passwordField: 'password' },
            async (err, user, info) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server error!" });
                }
                else
                    if (!user) {
                        if (info.name === "IncorrectUsernameError")
                            return res.status(200).json({
                                success: false,
                                data: {
                                    field: "email", raison: "user not found!",
                                },
                                message: "incorrect email or user not found."
                            });
                        else return res.status(200).json({
                            success: false,
                            data: {
                                field: "password", raison: "Incorrect password.",
                            },
                            message: "Incorrect password."
                        });

                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            data: {
                                user: user,
                                token: user.generateJWT()
                            },
                            message: "succesfull login"
                        });
                    }
            })(req, res, next)
    } catch (error) {
        return res.status(error.code || 500).send(error.message || "Unknown internal server error ! .");
    }
}

exports.forgot = async (req, res, next) => {
    return res.status(200).json({ message: "FORGOT" });
}

exports.reset = async (req, res, next) => {
    return res.status(200).json({ message: "RESET" });
}

exports.getMe = async (req, res, next) => {
    return res.status(200).json(req.user);
}