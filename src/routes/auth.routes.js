const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validators = require("../utils/validators/auth.validators")

router.post("/login", validators.loginValidations, authController.login);
router.post("/register", validators.registerValidations, authController.register);
router.post("/forgot", validators.loginValidations, authController.forgot);
router.post("/reset", validators.registerValidations, authController.reset);
router.get("/", passport.authenticate('jwt', { session: false }), authController.getMe);

module.exports = router;