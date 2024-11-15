const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/userController.js")


// User Singup Route
router.route("/signup")
.get( userController.renderSignupForm)
.post(wrapAsync(userController.signup))


// User login route
router.route("/login")
.get( userController.renderLoginForm)
.post( saveRedirectUrl,
   passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login)


//   User Logout Route
router.get("/logout", userController.logout)
module.exports = router;