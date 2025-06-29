const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const{ listingSchema, reviewSchema}=require("../schema.js");
const{isLoggedin,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
   if(error){
    let errMsg=error.details.map((ele)=>ele.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }

};
//post route(Reviews)
router.post("/",
    validateReview,
    isLoggedin,
    wrapAsync(reviewController.createReview));



//DELETE ROUTE(Reviews)
router.delete("/:reviewId",
    isLoggedin,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));
module.exports=router;