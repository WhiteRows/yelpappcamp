//IMPORT 'LIBRARIES'
const express = require('express');
const router = express.Router();
//CONTROLLER
const campgrounds = require('../controllers/campgrounds');
//IMPORT ASYNC ERROR HANDLING FUNCTION
const catchAsync = require('../utils/catchAsync');
//IMPORT MODELS
const Campground = require('../models/campground');
//MIDDLEWARE
const { isLoggedIn, isAuthor, validateCampground, validateReview } = require('../middleware')
//MIDDLEWARE TO UPLOAD FILES 
const multer = require('multer');
//CLOUDINARY STORAGE
const { storage } = require('../cloudinary');
//UPLOAD LOCATIOM
const upload = multer({ storage });


router.route('/')
    //'ALL CAMPGROUNDS' PAGE
    .get(catchAsync(campgrounds.index))
    //'CREATE NEW' ROUTE
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));


//'CREATE' PAGE
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    //'CAMPGROUND BY ID' PAGE
    .get(catchAsync(campgrounds.showCampground))
    //'EDIT' ROUTE
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    //'DELETE' ROUTE
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

//'EDIT' PAGE
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;