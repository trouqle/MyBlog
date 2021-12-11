
const mongoose = require('mongoose');
const { descriptors } = require('../../MyApp/seeds/seedHelpers');
const Blog = require('../models/blog');
const { title, owner } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/my-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Blog.deleteMany({});
    for (let i = 0; i <= 15; i++) {
        const blog = new Blog({
            author: '61b34b5a678a0d6b3132b05d',
            title: `${sample(title)} ${sample(owner)}`,
            location: `${sample(owner)}`,
            image: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1174&q=80',
            description: '    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi maiores ullam et architecto ipsum modi similique dolor non quisquam. Sed blanditiis reprehenderit provident necessitatibus nam repudiandae repellendus deserunt aliquam ut!'
        })
        await blog.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});