var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
var parseCookies = function(req, res, next) {
  next();
  // console.log('===============Cookies: ', req, res, next);

};

module.exports = parseCookies;
