function destroyCookies(ctx) {
  ctx.session = null
}

module.exports = destroyCookies;
