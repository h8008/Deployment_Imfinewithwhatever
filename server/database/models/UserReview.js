const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const UserReview = new mongoose.Schema({
  restaurant_id: {
    type: String,
  },
  restaurant_name: {
    type: String,
  },
  email: {
    type: Schema.Types.String,
    ref: User.email,
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model('UserReview', UserReview);
