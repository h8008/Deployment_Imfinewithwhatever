require('./loadEnvVariable.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const connectDB = require('./database/mongodbConnect.js');
const router = require('./routes/index.js');
const httpsServer = require('./config/ssl/ssl.js');
const catchJWTErrors = require('./app/Middleware/CatchJWTErrors.js');
const mongoose = require('mongoose');
const cors = require('kcors');
const corsOptions = require('./app/Middleware/corsOptions.js');

const app = new Koa();
const port = process.env.APP_PORT;

app.use(bodyParser());
app.use(cors(corsOptions));

router(app);
catchJWTErrors(app);
// httpsServer(app.callback())

connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`Listening on HTTPS port ${port}`));
});

module.exports = app;
