const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRdirectUrl } = require("../middleware.js");
const { signUp, renderSignupForm, renderLoginForm, login, logout } = require("../controllers/users.js");

router.route("/signup")
.get((renderSignupForm))
.post(wrapAsync(signUp));

router.route("/login")
.get((renderLoginForm))
.post(
    saveRdirectUrl,
     passport.authenticate("local",
        {failureRedirect:'/login',
            failureFlash:true
        }),
        login
    
);

router.get("/logout",(logout));

module.exports =router;