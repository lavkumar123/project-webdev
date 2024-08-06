const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

const { index, renderNewForm,  showListing, createListing, renderEditForm, updateListing, deleteListing } = require("../controllers/listings.js");

router
 .route("/")
 .get(wrapAsync(index))
 .post(
  isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync (createListing)
 )

 //New Route
 router.get("/new",isLoggedIn, renderNewForm);

router.route("/:id")
.get( wrapAsync(showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing, 
  wrapAsync(updateListing))
.delete(
    isLoggedIn,
    isOwner,
     wrapAsync(deleteListing));

  //Edit Route
  router.get("/:id/edit",
    isLoggedIn,
    isOwner,
     wrapAsync(renderEditForm));
  
  module.exports = router;