const express = require("express");
const validators = require("../utils/validators/user.validators")
const validator = require('../middelwares/express-validator-interceptor')()
const usersController = require("../controllers/user.controller.js");
const passport = require("passport");
const router = express.Router();

router.post("/", validators.createUserValidations, validator, usersController.create)
router.get("/paginate/", usersController.paginate);
router.get("/", usersController.findAll);
router.get("/:id", validators.findOneValidations, validator, usersController.findOne);
router.delete("/:id", validators.deleteValidations, validator, usersController.delete);
router.put("/:id", validators.updateValidations, validator, usersController.update);





//router.get("/",  userscontroller.findAll);

module.exports = router;