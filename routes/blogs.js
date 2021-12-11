const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateBlog } = require('../middleware.js');
const Blog = require('../models/blog');
const blogs = require('../controllers/blogs');

router.route('/')
    .get(catchAsync(blogs.index))
    .post(isLoggedIn, validateBlog, catchAsync(blogs.createBlog))

router.get('/new', isLoggedIn, blogs.renderNewForm)

router.route('/id')
    .get(catchAsync(blogs.showBlog))
    .put(isLoggedIn, isAuthor, validateBlog, catchAsync(blogs.updateBlog))
    .delete(isLoggedIn, isAuthor, catchAsync(blogs.deleteBlog))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(blogs.editBlog))

module.exports = router;