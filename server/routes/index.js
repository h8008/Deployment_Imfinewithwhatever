const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

const userRouter = require('./UserRoutes.js');
const userReviewRouter = require('./UserReviewsRoutes.js');
const yelpRouter = require('./YelpAPIRoutes.js');
const router = require('koa-router')();

router.get('/', function (ctx) {
  console.log('router.get(/)');
  return (ctx.body = 'What is up?');
});

router.use(
  '',
  userRouter.routes(),
  userReviewRouter.routes(),
  yelpRouter.routes()
);

module.exports = function (app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
};
