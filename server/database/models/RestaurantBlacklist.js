const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantBlacklist = new Schema({
    restaurant_id: {
        type: String
    },
    restaurantName: {
        type: String
    },
    email: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model("RestaurantBlacklist", restaurantBlacklist)