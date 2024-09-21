if(process.env.NODE_ENV!="production"){
require('dotenv').config()
console.log(process.env.secret)
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const  session = require("express-session");
const flash=require("connect-flash");
const User=require("./models/user.js");
const passport= require("passport");
const Listing=require("./models/listing.js")
const LocalStrategy=require("passport-local")
const { isLoggedIn } = require("./middleware.js");

let port = 8080;

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

main().then((res) => {
    console.log("Connected to Databade")
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');

}


const sessionOption={
    secret:"Supersecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.get("/listings/category/:categoryname", async(req,res)=>{
//  console.log(req.params.categoryname)
 let categoryList = await Listing.find({category : `${req.params.categoryname}`})
res.render("./listings/category.ejs",{categoryList})
})

app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/",userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
})


app.listen(port, () => {
    console.log("server is working");
})