const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{ listingSchema, reviewSchema}=require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const{isLoggedin,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
   if(error){
    let errMsg=error.details.map((ele)=>ele.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }

};

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,
  validateListing,
  upload.single('image'),
  wrapAsync(listingController.createListing));


//New Route
router.get("/new",isLoggedin,listingController.renderNewForm);
router.post("/:id/favourite", isLoggedin,listingController.favourites);
router.get("/favourite", isLoggedin,listingController.myFav);
//edit route
router.get("/:id/edit", isLoggedin, isOwner,wrapAsync(listingController.renderEditForm));

router.route('/:id')
.get(wrapAsync(listingController.showListing))
.put(validateListing,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner, wrapAsync(listingController.destroyListing));

module.exports=router;

