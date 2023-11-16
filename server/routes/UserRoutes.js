const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

const UserController = require('../app/Controllers/UserController');
const userRouter = require('koa-router')({
  prefix: '/users',
});

userRouter.get('/', () => {
  console.log('default user route');
});

userRouter.post('/login', UserController.login, Authorize('guest'));

userRouter.post('/signup', UserController.signup, Authorize('guest'));

userRouter.post(
  '/user/restaurant_preference',
  UserController.addRestaurantPreference
);

userRouter.post(
  '/user/restaurant_preference/update',
  UserController.updateRestaurantPreference,
  (err) =>
    console.log('user-router update restaurant preference route error: ', err)
);

userRouter.post('/currentuser/update', UserController.updateCurrentUser);

userRouter.get('/currentuser', UserController.getCurrentUser);

userRouter.get('/currentuser/yelp', UserController.getCurrentUserYelp);

userRouter.get(
  '/user/restaurant_preference/:email/:restaurantID',
  UserController.getRestaurantPreference,
  (err) =>
    console.log('user-router get restaurant preference route error: ', err)
);

userRouter.get(
  '/user/restaurant_preferences/:email',
  UserController.getAllRestaurantPreferencesForUser,
  (err) =>
    console.log('user-router get restaurant preference route error: ', err)
);

module.exports = userRouter;
