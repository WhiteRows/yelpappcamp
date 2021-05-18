//IMPORT 'JOI' VALIDATION SCHEMAS
const { campgroundSchema, reviewSchema } = require('./schemas.js');
//IMPORT EXPRESS ERROR CLASS
const ExpressError = require('./utils/ExpressError');
//IMPORT CAMPGROUND MODEL
const Campground = require('./models/campground');
const Review = require('./models/review');


//VALIDATE IF USER IS NOT LOGED IN -> FLASH ERROR MESSAGE AND REDIRECT
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    };
    next();
};

//VALIDATE IF USER IS NOT AN AUTHOR -> FLASH ERROR MESSAGE AND REDIRECT
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'Not enough permission to execute.');
        return res.redirect(`/campgrounds/${campground._id}`);
    };
    next();
};

//VALIDATE IF USER IS NOT A REVIEW AUTHOR -> FLASH ERROR MESSAGE AND REDIRECT
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Not enough permission to execute.');
        return res.redirect(`/campgrounds/${id}`);
    };
    next();
};


//CAMGROUND VALIDATION
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    };
};

//REVIEW VALIDATION
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    };
};

