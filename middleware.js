const Listing= require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, ReviewSchema } = require("./schema.js");
const Reviews = require("./models/review.js");




// validation For Listings
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};

// Validation For Review
module.exports.ValidateReview = (req, res, next) => {
    let { error } = ReviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};

// To check User is logged in or not
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
                req.session.Redirecturl = req.originalUrl;

        req.flash("error","You must be logged in to create listing");
        res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
   if(req.session.Redirecturl){
     res.locals.Redirecturl=req.session.Redirecturl;}

     next();
}


// To check Is owner
module.exports.isOwner= async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this listing ");
    return res.redirect(`/listings/${id}`)
    }
    next()
};


// To check review owner
module.exports.isAuthorReview= async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Reviews.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not the author of this review ");
    return res.redirect(`/listings/${id}`)
    }
    next()
};