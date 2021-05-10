const { body, param } = require('express-validator');


const updateValidations = [
    param("id", "Incomplete update request ").exists().notEmpty(),
    body(["firstName", "lastName", "adress", "phone", "gender", "birthDate", "email", "password", "badge"], "Incomplete update request .").exists(),
    body("gender", "gender must be an integer.").isInt(),
    //body("birthDate","birth Date is incorrect date . ").isDate(),
    body("email", "Email is incorrect.").isEmail(),
    //body("phone","phone is incorrect .").isMobilePhone()
];

const deleteValidations = [
    param("id", "Incomplete delete request ").exists().notEmpty()
];

const findOneValidations = [
    param("id", "Incomplete find request ").exists().notEmpty()
];
const createUserValidations = []
module.exports = { deleteValidations, updateValidations, findOneValidations, createUserValidations };