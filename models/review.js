const mongoose = require('mongoose')
const schema = mongoose.Schema
const reviewschema = new schema({
    name: String,
    rating: Number,
    text: String,
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }

})

const Review = mongoose.model('Review', reviewschema)
module.exports = Review;