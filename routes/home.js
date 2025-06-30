const express = require("express");
const router = express.Router();
const listingController=require("../controllers/listing.js");


router.get('/',listingController.homepage);


module.exports=router;