const Listing=require("./models/listing.js");
const Review=require("./models/review.js");



module.exports.isLoggedin=(req,res,next)=>{
        if (!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; 
        req.flash("error",'You need to be logged in ..');
        return res.redirect("/login");
        
    }
    next();
};
module.exports.saveRedirectUrl=(req,res,next)=>{
    if (req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permissions! you are not the owner");
         return res.redirect(`/listings/${id}`);
    }
      next();
};
module.exports.isReviewAuthor=async(req,res,next)=>{
    const { id , reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permissions! you are not the author of this review");
         return res.redirect(`/listings/${id}`);
    }
      next();
};
