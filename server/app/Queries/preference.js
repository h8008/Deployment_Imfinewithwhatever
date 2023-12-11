const { User } = require('../../database/models');
const Preference = require('../../database/models/Preference');

const GET_PREFERENCES_FOR_ONE_USER = async ({ email }) =>
  await Preference.find({
    email: email,
  });

const GET_PREFERENCES_FOR_OTHER_USERS = async ({ email }) => {
  const otherUsers = await User.find({
    email: { $not: { $regex: `${email}` } },
  });
  await User.populate(otherUsers, { path: 'preference' });
  return await otherUsers.map((u, i) => u.preference);
};

const GET_PREFERENCES = async () => await Preference.find();

module.exports = {
  GET_PREFERENCES,
  GET_PREFERENCES_FOR_ONE_USER,
  GET_PREFERENCES_FOR_OTHER_USERS,
};
