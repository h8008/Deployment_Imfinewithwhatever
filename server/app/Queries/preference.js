const GET_PREFERENCE = async ({ email, restaurantID }) => {
  await Preference.findOne({
    email: email,
    restaurant_id: restaurantID,
  });
};

module.exports = { GET_PREFERENCE };
