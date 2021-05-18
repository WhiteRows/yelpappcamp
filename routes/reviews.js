//IMPORT 'LIBRARIES'
const express = require('express');
const router = express.Router({ mergeParams: true });
//IMPORT MIDDLEWARE
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
//IMPORT ASYNC ERROR HANDLING FUNCTION
const catchAsync = require('../utils/catchAsync');
//IMPORT MODELS
const Campground = require('../models/campground');
const Review = require('../models/review');
//REVIEW CONTROLLER
const reviews = require('../controllers/reviews');


//'POST REVIEW' ROUTE
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//'DELETE REVIEW' ROUTE
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


module.exports = router;