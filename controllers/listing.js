const Listing=require("../models/listing.js");
const User=require("../models/user.js");

// .exports.index=async (req, res) => {
//     const allListings = await Listing.find();
//     res.render("./listings/index.ejs", { allListings });
//     console.log("working");module

// };
module.exports.homepage=async(req,res)=>{
    console.log("home");
    res.render("./listings/home.ejs");
};

module.exports.index = async (req, res) => {
    const { search } = req.query;

    let allListings;
    if (search) {
        const regex = new RegExp(escapeRegex(search), 'i');

        // Search in multiple fields: title, location, description
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

    res.render("./listings/index.ejs", { allListings, search });
    
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Add to /remove from favourites route
module.exports.favourites= async (req, res) => {
    const listingId = req.params.id;
    const user = req.user;

    if (user.favourites.includes(listingId)) {
        await User.findByIdAndUpdate(user._id, { $pull: { favourites: listingId } });
        req.flash("success", "Listing removed from favourites!");
    } else {
        await User.findByIdAndUpdate(user._id, { $addToSet: { favourites: listingId } });
        req.flash("success", "Listing added to favourites!");
    }

    res.redirect(`/listings/${listingId}`);
};

//Favourites page
 module.exports.myFav=async (req, res) => {
    const user = await User.findById(req.user._id).populate("favourites");
    res.render("listings/favourites", { favourites: user.favourites });
};

module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs");

};
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
    path: "reviews",
    populate: {
      path: "author"
    }
  }).populate("owner");
    if (!listing){
    req.flash("error","Listing You Requested Was deleted!");  
  return res.redirect("/listings");  
    }
    res.render("./listings/show.ejs", { listing });

};
module.exports.createListing = async (req, res, next) => {
    if (!req.file) {
        req.flash("error", "Image is required!");
        return res.redirect("/listings/new");
    }

    const url = req.file.path;
    const filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();
    console.log("req.file:", req.file);

    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
};

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let originalImageUrl=listing.image.url;
     originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250,q_60");

    res.render("./listings/edit.ejs", {listing ,originalImageUrl});
};


//
// update route
module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
   
   if(typeof req.file !=="undefined") 
    {
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
   }

        req.flash("success"," Listing Updated!");
        res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
        req.flash("success","Listing Deleted!");
    res.redirect("/listings");


};