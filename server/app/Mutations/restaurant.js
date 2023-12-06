const mongoose = require('mongoose');
const Restaurant = require('../../database/models/Restaurant');
const Restaurants = require('../../database/models/Restaurants');

const getBusinesses = (restaurants) =>
  new Promise((resolve, reject) =>
    resolve(restaurants.map((r) => ({ ...r, yelp_id: r.id })))
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

const getBusinessModels = (businesses) =>
  new Promise((resolve, reject) => {
    return resolve(
      businesses.map(async (b) => {
        const restaurant = await Restaurant.create({ ...b });
        await restaurant.save();
        return restaurant;
      })
    );
  });

const createRestaurantsModel = (restaurants, businessModels) => {
  return new Promise((resolve, reject) => {
    const model = Restaurants.create({
      ...restaurants,
      businesses: businessModels.map((b) => b.id),
    });
    model.save();
    return resolve();
  });
};

const ADD_RESTAURANTS = async ({ restaurants }) => {
  // Adds a "yelp_id" field to the business object
  // const businesses = await restaurants.businesses.map((r) => ({
  //   ...r,
  //   yelp_id: r.id,
  // }));

  // const businesses = await getBusinesses(restaurants)

  // Removes the id property from the businesses object
  // const databaseReadyBusinesses = await businesses.map((b) =>
  //   Object.fromEntries(
  //     Object.entries(b)
  //       .map((key, val) => (key === 'id' ? null : [key, val]))
  //       .filter((entry) => entry !== null)
  //   )
  // );

  // const businessModels = databaseReadyBusinesses.map(async (b) => {
  //   const restaurant = await Restaurant.create({ ...b });
  //   await restaurant.save();
  // });

  // const model = await Restaurants.create({
  //   ...restaurants,
  //   businesses: businessModels.map((b) => b.id),
  // });
  // model.save();

  const businesses = await getBusinesses(restaurants.businesses);
  const databaseReadyBusinesses = await getDatabaseReadyBusinesses(businesses);
  const businessModels = await getBusinessModels(databaseReadyBusinesses);
  await createRestaurantsModel(restaurants, businessModels);
};

module.exports = {
  ADD_RESTAURANTS,
};
