const express = require("express");
const router = express.Router({mergeParams:true});
const { listingSchema, ReviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Reviews = require("../models/review.js");
const{ValidateReview,isLoggedIn,isAuthorReview}=require("../middleware.js")
const reviewController=require("../controller/reviewController.js")



// Review Post Route
router.post("/",
    isLoggedIn,
    ValidateReview,
    wrapAsync(reviewController.createReview))

// Review Delete Route
router.delete("/:reviewId",
    isLoggedIn,
    isAuthorReview,
     wrapAsync(reviewController.destroyReview))

module.exports=router;