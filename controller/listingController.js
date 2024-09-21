const Listing=require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// all listing Route
module.exports.index=async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}

// New Form Route
module.exports.renderNewForm=(req, res) => {
    res.render("./listings/new.ejs")
}

// Create Route
module.exports.createListing=async (req, res) => {
    //   let {title,description,image,price,country,location}=req.body; //  another method also available
    // let listings = req.body.listings;  //same as above method
   let response= await geocodingClient.forwardGeocode({
        query: `${req.body.listings.location}`,
        limit:1,
      })
        .send()
    let url = req.file.path;
    let filename = req.file.filename;
    const NewListings = new Listing(req.body.listings);  //another method
    NewListings.image={url,filename};
    NewListings.owner = req.user._id;
    NewListings.geometry=response.body.features[0].geometry
     await NewListings.category.push("Trending");
     let  save1=await NewListings.save();
     console.log(save1)
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

// Show Route

module.exports.showListings=async (req, res) => {
    let { id } = await req.params;
    const listings = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
        path: "author",
        }
    }).populate("owner");
    if (!listings) {
        req.flash("error", "Listing Your Requested For Doesn't exist")
        res.redirect("/listings")
    }
    else {
        res.render("./listings/show.ejs", { listings });
    }

}

// Edit form route and update route
module.exports.renderEditForm=async (req, res) => {
    let { id } = await req.params;
    const listings = await Listing.findById(id);
    if (!listings) {
        req.flash("error", "Listing Your Requested For Doesn't exist")
        res.redirect("/listings")
    }
    let originalImageUrl=listings.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    console.log(originalImageUrl)
    res.render("./listings/edit.ejs", { listings,originalImageUrl });
}

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
   const listing= await Listing.findByIdAndUpdate(id, { ...req.body.listings })
   
   if(typeof req.file !="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename}
    await listing.save();
   }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

// Delete Route
module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");

}