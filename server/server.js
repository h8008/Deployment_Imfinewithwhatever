require('./loadEnvVariable.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const connectDB = require('./database/mongodbConnect.js');
const router = require('./routes/index.js');
const session = require("./session/index.js")
const httpsServer = require('./config/ssl/ssl.js');
const catchJWTErrors = require('./app/Middleware/CatchJWTErrors.js');
const mongoose = require('mongoose');
const cors = require('kcors');
const corsOptions = require('./app/Middleware/corsOptions.js');
const getDevEnvironment = require('./utils/GetDevEnvironment.js');
const { default: cookie } = require('koa-cookie');


const app = new Koa();
const port = process.env.APP_PORT;

app.use(bodyParser());
app.use(cors(corsOptions));
app.use(cookie());

router(app);
session(app)
catchJWTErrors(app);

app.proxy = true

connectDB();

mongoose.connection.once('open', () => {
  console.log('development', getDevEnvironment());
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`Listening on HTTPS port ${port}`));
});

module.exports = app;
