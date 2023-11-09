const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const restaurantBlacklist = new Schema({
  restaurant_id: {
    type: String,
  },
  restaurantName: {
    type: String,
  },
  email: {
    type: Schema.Types.String,
    ref: User.email,
  },
});

module.exports = mongoose.model('RestaurantBlacklist', restaurantBlacklist);
