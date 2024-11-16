const express = require("express");
const router = express.Router();
const { listingSchema, ReviewSchema } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listingController.js")
const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

// IndexRoute and CreatePostRoute
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listings[image]"),
        validateListing,
        wrapAsync(listingController.createListing));


// New route
router.get("/new", isLoggedIn, listingController.renderNewForm)

// search route 
router.get("/search",wrapAsync(listingController.searchListing));

// ShowRoute ,update  and Delete Route
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isLoggedIn, isOwner, upload.single("listings[image]"), 
    validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// category route
router.get("/category/:categoryname",wrapAsync(listingController.categoryListing));


//  edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))



module.exports = router;
