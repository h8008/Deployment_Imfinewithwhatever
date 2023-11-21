const Preference = require('../../database/models/Preference');

const GET_PREFERENCES_FOR_CURRENT_USER = async ({ email }) =>
  await Preference.find({
    email: email,
  });

const GET_PREFERENCES = async () => await Preference.find();

module.exports = { GET_PREFERENCES, GET_PREFERENCES_FOR_CURRENT_USER };
