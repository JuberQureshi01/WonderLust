const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Review= require("./review.js")


let ListingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            url: String,
            filename:String,
        },
        category:[{
            type:String,
            enum:["Trending","Mountains","Rooms","Iconiccities","Amazingpools","Camping","Castels","Farming","Arctic","Domes"],
        }],
        price: {
            type: Number,
            // required: true
        },
        location: {
            type: String,
        },
        country: {
            type: String,
        },
        reviews:[{
            type:Schema.Types.ObjectId,
            ref:"Review",
        },],
        owner:
            {
             type:Schema.Types.ObjectId,
             ref:"User",
            },
        geometry: {
                type: {
                  type: String, // Don't do `{ location: { type: String } }`
                  enum: ['Point'], // 'location.type' must be 'Point'
                  required: true
                },
                coordinates: {
                  type: [Number],
                  required: true
                }
              }

    }
);

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
    await Review.deleteMany({_id:{$in:listing.reviews}})}
})

const listing = mongoose.model("listing", ListingSchema);

module.exports = listing;