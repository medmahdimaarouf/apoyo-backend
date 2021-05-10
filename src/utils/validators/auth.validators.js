const { body } = require('express-validator');

const loginValidations = [
    body(["email", "password"], "Incomplete login request. ").exists(),
    body(["email", "password"], "Incorrect login request.").notEmpty(),
    body("email", "Incorrect email.").normalizeEmail().isEmail()
];

const registerValidations = [
    body(["firstName", "lastName", "adress", "phone", "gender", "email", "password"], "Incomplete register request .").exists(),
    body("gender", "gender must be an integer.").isInt(),
    //body("birthDate","birth Date is incorrect date . ").isDate(),
    body("email", "Email is incorrect.").isEmail(),
    //body("phone","phone is incorrect .").isMobilePhone()
];
module.exports = { loginValidations, registerValidations }