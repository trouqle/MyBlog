const Blog = require('../models/blog');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    blog.reviews.push(review);
    await review.save();
    await blog.save();
    req.flash('success', 'Created new review');
    res.redirect(`/blogs/${blog._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfulyy deleted review');
    res.redirect(`/blogs/${id}`);
}