
const User = require("../models/user.js");

// Sign up form
module.exports.renderSignupForm = async (req, res) => {
    res.render("./user/signup.ejs");
}

//  Sign up post route
module.exports.signup = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password)
        req.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", `Welcome in WonderLust ${username}`);
            res.redirect("/listings")
        })
        // console.log(registeredUser)
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}


//  Login route
module.exports.renderLoginForm = async (req, res) => {
    res.render("./user/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back")
    let Redirecturl = res.locals.Redirecturl || "/listings";
    res.redirect(Redirecturl);
}


//Logout route
module.exports.logout = async (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "Your are successfully logout");
        res.redirect("/listings")
    }
    );
}