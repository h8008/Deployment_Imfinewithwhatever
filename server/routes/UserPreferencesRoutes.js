const preferenceRouter = require('koa-router')({
  prefix: '/preferences',
});

const PreferenceController = require('../app/Controllers/PreferenceController');

preferenceRouter.get('/', () => {
  console.log('default user preference router');
});

userPreferenceRouter.post('/add', PreferenceController.add);

userPreferenceRouter.post('/update', PreferenceController.update);

userPreferenceRouter.post('/delete', PreferenceController.delete);

userPreferenceRouter.get('/get', PreferenceController.get);

module.exports = preferenceRouter;
