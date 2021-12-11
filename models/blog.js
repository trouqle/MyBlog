const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String,
    date: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

BlogSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Blog', BlogSchema);