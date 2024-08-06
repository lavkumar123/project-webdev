const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const{validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const { review, destroyReview } = require("../controllers/reviews.js");


// reviews
// post route
router.post("/",
  isLoggedIn,
   validateReview,
   wrapAsync (review)
 
 );
 
 //review delete route
 
 router.delete(
   "/:reviewId",
   isLoggedIn,
   isReviewAuthor, 
   wrapAsync(destroyReview));

 module.exports = router;