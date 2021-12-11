const Blog = require('../models/blog');

module.exports.index = async (req, res) => {
    const blogs = await Blog.find({});
    res.render('blogs/index', { blogs });
}

module.exports.renderNewForm = (req, res) => {
    res.render('blogs/new');
}

module.exports.createBlog = async (req, res, next) => {
    const blog = new Blog(req.body.blog);
    blog.author = req.user._id;
    await blog.save();
    req.flash('success', 'Successfully made a blog');
    res.redirect(`blogs/${blog._id}`);
}

module.exports.showBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
        .populate('author');
    console.log(blog);
    if (!blog) {
        req.flash('error', 'Cannot find that blog')
        return res.redirect('/blogs');
    }
    res.render('blogs/show', { blog });
}

module.exports.editBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        req.flash('error', 'Cannot find that blog')
        return res.redirect('/blogs');
    }

    res.render('blogs/edit', { blog });
}

module.exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
    req.flash('success', 'Successfuly updated Blog');
    res.redirect(`/blogs/${blog._id}`);
}

module.exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog.author.equals(req.user._id)) {
        req.flash('error', 'You do not permission to do that')
        return res.redirect(`/blogs/${id}`);
    }
    await Blog.findByIdAndDelete(id);
    req.flash('success', 'Successfuly deleted Blog');
    res.redirect('/blogs');
}