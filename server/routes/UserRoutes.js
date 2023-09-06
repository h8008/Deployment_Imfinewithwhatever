const UserController = require("../app/Controllers/UserController");
const userRouter = require("koa-router")({
  prefix: "/users",
});

userRouter.post("/login", UserController.login, (err) =>
  console.log("user-router login route error:", err)
);

userRouter.post("/signup", UserController.signup, (err) =>
  console.log("user-router signup route error: ", err)
);

userRouter.post(
  "/user/restaurant_preference",
  UserController.addRestaurantPreference,
  (err) =>
    console.log("user-router add restaurant preference route error: ", err)
);

userRouter.post(
  "/user/restaurant_preference/update",
  UserController.updateRestaurantPreference,
  (err) =>
    console.log("user-router update restaurant preference route error: ", err)
);

userRouter.get(
  "/user/restaurant_preference/:email/:restaurantID",
  UserController.getRestaurantPreference,
  (err) =>
    console.log("user-router get restaurant preference route error: ", err)
);

userRouter.get(
  "/user/restaurant_preferences/:email",
  UserController.getAllRestaurantPreferencesForUser,
  (err) =>
    console.log("user-router get restaurant preference route error: ", err)
);

module.exports = userRouter;
