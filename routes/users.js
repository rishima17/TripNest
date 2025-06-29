const express = require("express");
const router = express.Router();
const User=require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");
const user = require("../models/user.js");


router.route("/signup")
.get(userController.renderSignupForm )
.post( wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),userController.login);



router.get("/logout",userController.logOut);


module.exports=router;

