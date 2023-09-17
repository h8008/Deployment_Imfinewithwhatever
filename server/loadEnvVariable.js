const envpath = __dirname + '/' + '.env';
// Load environment variables (or .env if local environment)
require('dotenv').config({ path: envpath });