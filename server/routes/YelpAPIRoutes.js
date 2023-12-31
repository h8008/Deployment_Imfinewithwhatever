const YelpController = require('../app/Controllers/YelpController');
const yelpRouter = require('koa-router')({
  prefix: '/yelp',
});

// yelpRouter.get(
//   '/restaurants/:term/:location',
//   YelpController.getRestaurantsByLocation,
//   (err) => console.log('yelp-router restaurants by location route called')
// );

yelpRouter.get(
  '/restaurantsbylocation',
  YelpController.getRestaurantsByLocation,
  (err) => console.log('yelp-router restaurants by location route called')
)

// yelpRouter.get(
//   '/restaurants/:term/:location/:categories',
//   YelpController.getRestaurantsByCuisine,
//   (err) => console.log('yelp-router restaurants by cuisine route called')
// );

yelpRouter.get(
  '/restaurantsbycuisines',
  YelpController.getRestaurantsByCuisine,
  (err) => console.log('yelp-router restaurants by cuisine route called')
);

yelpRouter.get(
  '/restaurant/:id/reviews',
  YelpController.getRestaurantReviews,
  () => console.log('yelp-router restaurant review called')
);

yelpRouter.get('/restaurant/:id', YelpController.getRestaurantById, () =>
  console.log('yelp-router restaurant by id route called')
);

// yelpRouter.post("/restaurants", YelpController.storeRestaurants, (err) =>
//   console.log("yelp-router store restaurants route called")
// );

module.exports = yelpRouter;
