const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const getDevEnvironment = require('../../utils/GetDevEnvironment.js');

module.exports = function (app) {
  // return getDevEnvironment() ? http.createServer(app) : https.createServer(app)
  return http.createServer(app);
};
