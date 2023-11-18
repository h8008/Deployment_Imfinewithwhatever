const preferenceRouter = require('koa-router')({
  prefix: '/preferences',
});

const PreferenceController = require('../app/Controllers/PreferenceController');

preferenceRouter.get('/', (ctx) => {
  console.log('default user preference router');
  ctx.body = 'default user preference router';
});

preferenceRouter.post('/add', PreferenceController.add);

preferenceRouter.post('/update', PreferenceController.update);

preferenceRouter.post('/delete', PreferenceController.destroy);

preferenceRouter.get('/get', PreferenceController.get);

module.exports = preferenceRouter;
