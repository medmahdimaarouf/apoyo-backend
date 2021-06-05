const express = require("express");
const controller = require("../controllers/category.controller.js");
const router = express.Router();
const passport = require("passport");


router.post("/", passport.authenticate('access', { session: false }), controller.create)
router.get("/", passport.authenticate('access', { session: false }), controller.findAll);
router.get("/:id", passport.authenticate('access', { session: false }), controller.findOne);
router.delete("/:id", passport.authenticate('access', { session: false }), controller.delete);
router.put("/:id", passport.authenticate('access', { session: false }), controller.update);

module.exports = router;