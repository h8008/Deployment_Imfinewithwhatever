const Preference = require('../../database/models/Preference');

const GET_PREFERENCES = async ({ email }) =>
  await Preference.find({
    email: email,
  });

module.exports = { GET_PREFERENCES };
