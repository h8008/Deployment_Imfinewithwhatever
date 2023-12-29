function destroyCookies(ctx) {
  ctx.cookies.set('access_token', null);
  // ctx.cookies.set('email', null);
  // ctx.res.setHeader("set-cookie", `email=${email}`)
  // ctx.res.setHeader("set-cookie", `email=${null}`)
  // ctx.cookies.set('loggedIn', null);
}

module.exports = destroyCookies;
