const YelpController = require("../app/Controllers/YelpController");
const yelpRouter = require("koa-router")({
  prefix: "/yelp",
});

yelpRouter.get(
  "/restaurants/:term/:location",
  YelpController.getRestaurantsByLocation,
  (err) => console.log("yelp-router restaurants by location route called")
);

yelpRouter.get(
  "/restaurants/:term/:location/:categories",
  YelpController.getRestaurantsByCuisine,
  (err) => console.log("yelp-router restaurants by cuisine route called")
);

yelpRouter.get("/restaurant/:id", YelpController.getRestaurantById, (err) =>
  console.log("yelp-router restaurant by id route called")
);

// yelpRouter.post("/restaurants", YelpController.storeRestaurants, (err) =>
//   console.log("yelp-router store restaurants route called")
// );

module.exports = yelpRouter;
