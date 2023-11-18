const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');
const cors = require('../app/Middleware/CORS.js');
const errorHandler = require('../app/Middleware/ErrorHandler.js');

const userRouter = require('./UserRoutes.js');
const userReviewRouter = require('./UserReviewsRoutes.js');
const preferenceRouter = require('./PreferencesRoutes.js');
const yelpRouter = require('./YelpAPIRoutes.js');
const router = require('koa-router')();

router.get('/', function (ctx) {
  console.log('router.get(/)');
  return (ctx.body = 'What is up?');
});

router.use(errorHandler);
router.use(cors);
router.use(
  '',
  userRouter.routes(),
  userReviewRouter.routes(),
  preferenceRouter.routes(),
  yelpRouter.routes()
);

module.exports = function (app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
};
