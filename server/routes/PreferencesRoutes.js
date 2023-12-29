const preferenceRouter = require('koa-router')({
  prefix: '/preferences',
});

const PreferenceController = require('../app/Controllers/PreferenceController');
const VerifyJWT = require('../app/Middleware/VerifyJWT');

preferenceRouter.get('/', (ctx) => {
  console.log('default user preference router');
  ctx.body = 'default user preference router';
});

// preferenceRouter.use(VerifyJWT)

preferenceRouter.post('/add', PreferenceController.add);

preferenceRouter.post('/update', PreferenceController.update);

preferenceRouter.post('/delete', PreferenceController.destroy);

preferenceRouter.get(
  '/currentuser/getall',
  PreferenceController.getAllForCurrentUser
);

preferenceRouter.get(
  '/otherusers/getall',
  PreferenceController.getAllForOtherUsers
);

preferenceRouter.get('/getall', PreferenceController.getAll);

module.exports = preferenceRouter;
