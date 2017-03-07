var Sessions = require('../models/session');
var util = require('../lib/utility');
var express = require('express');
var app = express();
var createSession = function(req, res, next) {
  req.session = { hash : 1 };
  if (req.cookies) {
    var arr =  req.cookies.split('; ');
    for (var i=0; i< arr.length; i++) {
      var cleaned = arr[i].split('=');
      var cleanedCookieKey = cleaned[0];
      var cleanedCookie = cleaned[1];
      res.cookies[cleanedCookieKey] = cleanedCookie;
    }
  }
  next();
};

module.exports = createSession;
