const { blogSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Blog = require('./models/blog');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //store the url they are requesting
        req.session.returnTo = req.originalUrl;
        req.flash('error', ' You must be signed in first');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateBlog = (req, res, next) => {

    //    if (!req.body.blog) throw new ExpressError('Invalid blog data', 400);
    const { error } = blogSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog.author.equals(req.user._id)) {
        req.flash('error', 'You do not permission to do that')
        return res.redirect(`/blogs/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not permission to do that')
        return res.redirect(`/blogs/${id}`);
    }
    next();
}