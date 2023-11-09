const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const userPreferenceSchema = new Schema({
  restaurant_id: {
    type: String,
  },
  email: {
    type: String,
  },
  food_prefs: {
    type: String,
  },
  like: {
    type: String,
  },
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
