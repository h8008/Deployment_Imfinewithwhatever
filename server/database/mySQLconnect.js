var mysql = require('mysql');
require('dotenv').config({ path: '../.env' });

var connection = mysql.createConnection({
  //    debug: true,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

console.log('process.env', process.env.DB_USER);

module.exports = connection;
