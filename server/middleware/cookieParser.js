var express = require('express');

var app = express();
var parseCookies = function(req, res, next) {
  if (req.headers.cookie) {
    var arr =  req.headers.cookie.split('; ');
    for (var i=0; i< arr.length; i++) {
      var cleaned = arr[i].split('=');
      var cleanedCookieKey = cleaned[0];
      var cleanedCookie = cleaned[1];
      req.cookies[cleanedCookieKey] = cleanedCookie;
    }
  }
  // next();
};

module.exports = parseCookies;
