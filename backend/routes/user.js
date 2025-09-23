const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user.js");

router.route("/auth/signup").post(userController.userSignup);

router.route("/auth/login").post(passport.authenticate('local' , { failureRedirect : '/listing' , failureFlash : true }) ,userController.userLogin);

router.get("/auth/logout" , userController.logout );

router.get("/auth/me" , userController.me);

module.exports = router;