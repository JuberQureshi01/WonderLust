const mongoose = require("mongoose");
const InitData = require("./data.js");
const Listing=require("../models/listing.js")


main().then((res) => {
    console.log("Connected to Database")
})
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');

}

let InitDB= async ()=>{
    await Listing.deleteMany({});
     InitData.data= InitData.data.map((obj)=>({...obj,owner:"6715d44339b1f708db82c2f9",category:"Trending"}))
    await Listing.insertMany(InitData.data)
    console.log("data inserted");
}

InitDB();