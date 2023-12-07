const mongoose = require('mongoose');
const Restaurant = require('../../database/models/Restaurant');
const Restaurants = require('../../database/models/Restaurants');

const getBusinesses = (restaurants) =>
  new Promise((resolve, reject) =>
    resolve(
      restaurants.map((r) => {
        delete r['id'];
        return { ...r, yelp_id: r.id };
      })
    )
  );

const getDatabaseReadyBusinesses = (businesses) =>
  new Promise((resolve, reject) => {
    const values = Object.keys(businesses)
      .map((key, i) => (key === 'id' ? null : businesses[key]))
      .filter((el) => el !== null);
    const object = {};
    const keys = Object.keys(businesses);
    values.forEach((v, i) => (object[keys[i]] = v));
    return resolve(object);
  });

// const getBusinessModels = (businesses) =>
//   new Promise((resolve, reject) => {
//     return resolve(
//       new Promise(
//         async (res, rej) =>
//           await businesses.map(async (b) => {
//             const restaurant = await Restaurant.create({ ...b });
//             await restaurant.save();
//             return res(restaurant._id);
//           })
//       )
//     );
//   });

const createBusinessSchemas = async (businesses) => {
  const ids = [];
  for (let i in businesses) {
    const restaurant = await Restaurant.create({ ...businesses[i] });
    await restaurant.save();
    ids.push(restaurant._id);
  }
  return ids;
};

const createRestaurantsModel = (restaurants, businessModels) => {
  return new Promise(async (resolve, reject) => {
    const model = await Restaurants.create({
      ...restaurants,
      businesses: businessModels.map((b) => b),
    });
    await model.save();
    return resolve(model);
  });
};

const ADD_RESTAURANTS = async ({ restaurants }) => {
  const businesses = await getBusinesses(restaurants.businesses);
  const businessesSchema = await createBusinessSchemas(businesses);
  const restaurantsSchema = await createRestaurantsModel(
    restaurants,
    businessesSchema
  );
  return restaurantsSchema;
};

module.exports = {
  ADD_RESTAURANTS,
};
