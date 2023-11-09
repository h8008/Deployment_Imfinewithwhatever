const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const userPreferenceSchema = new Schema({
  restaurant_id: {
    type: String,
  },
  email: {
    type: Schema.Types.String,
    ref: User.email,
  },
  food_prefs: {
    type: String,
  },
  like: {
    type: String,
  },
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
