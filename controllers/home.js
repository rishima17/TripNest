const Listing=require("../models/listing.js");
const User=require("../models/user.js");
module.exports.homepage=async(req,res)=>{
    console.log("home");
    res.render("home.ejs");
};
module.exports.index = async (req, res) => {
    const { search } = req.query;

    let allListings;
    if (search) {
        const regex = new RegExp(escapeRegex(search), 'i');
        allListings = await Listing.find({
            $or: [
                { title: regex },
                { location: regex },
                { description: regex }
            ]
        });
    } else {
        allListings = await Listing.find();
    }

    res.render("./listings/index.ejs", { 
        allListings, 
        search, 
        activeCategory: null   // ✅ always send this
    });
};
