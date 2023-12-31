const session = require("koa-session")
const getDevEnvironment = require("../utils/GetDevEnvironment.js")

const dev = getDevEnvironment()

const CONFIG = {
  key: "koa.sess" /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: dev ? false : true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: dev ? false : true /** (boolean) secure cookie*/,
  sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,
};

function useSession(app) {
  app.keys = [process.env.SESSION_KEYS]
  app.use(session(CONFIG, app));
  app.use((ctx) => {
    // ignore favicon
    if (ctx.path === "/favicon.ico") return;

    let n = ctx.session.views || 0;
    let user = ctx.session.user || {}
    let access_token = ctx.session.access_token | ""
    ctx.session.views = ++n;
    ctx.session.user = user
    ctx.session.access_token = access_token
    // ctx.body = n + " views";
    ctx.body = { user, access_token }
  });
}

module.exports = useSession