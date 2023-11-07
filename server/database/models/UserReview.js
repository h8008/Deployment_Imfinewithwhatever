const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserReview = new mongoose.Schema({
    restaurant_id: {
        type: String,
    },
    restaurant_name: {
        type: String,
    },
    email: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    review: {
        type: String
    },
    rating: {
        type: Number
    }
})

module.exports = mongoose.model("UserReview", UserReview)