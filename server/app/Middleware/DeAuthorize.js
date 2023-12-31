const destroyCookies = require('../../config/destroyCookies');

module.exports = (min_type) => {
  return async (ctx, next) => {
    // destroyCookies(ctx);
    // ctx.cookies.set('access_token', null);
    // ctx.cookies.set('email', null);
    // ctx.cookies.set('loggedIn', null);
    ctx.session = null
    // ctx.session.save()
    return await next();
  };
};
