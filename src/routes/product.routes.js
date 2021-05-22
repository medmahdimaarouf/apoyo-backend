const express = require("express");
const productController = require("../controllers/product.controller.js");
const router = express.Router();
const passport = require("passport");


router.post("/", passport.authenticate('access', { session: false }), productController.create)
router.get("/paginate/", passport.authenticate('access', { session: false }), productController.paginate);
router.get("/", passport.authenticate('access', { session: false }), productController.findAll);
router.get("/:id", passport.authenticate('access', { session: false }), productController.findOne);
router.delete("/:id", passport.authenticate('access', { session: false }), productController.delete);
router.put("/:id", passport.authenticate('access', { session: false }), productController.update);

module.exports = router;