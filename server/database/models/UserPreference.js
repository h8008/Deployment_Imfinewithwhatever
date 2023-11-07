const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userPreferenceSchema = new Schema({
    restaurant_id: {
        type: String
    },
    email: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    food_prefs: {
        type: String
    },
    like: {
        type: String
    }
})

module.exports = mongoose.model('UserPreference', userPreferenceSchema)