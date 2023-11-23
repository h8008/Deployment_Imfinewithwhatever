const destroyCookies = require('../../config/destroyCookies');

module.exports = (min_type) => {
  return (ctx, next) => {
    destroyCookies(ctx);
    return next();
  };
};
