const Listing=require("../models/listing.js");
const User=require("../models/user.js");
module.exports.homepage=async(req,res)=>{
    console.log("home");
    res.render("home.ejs");
};