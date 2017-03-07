var express = require('express');
var sessions = require('../models/sessions')
var app = express();
var parseCookies = function(req, res, next) {
  //var shortlyID = [];
  console.log(req);
  if (req.headers.cookie) {
    var arr =  req.headers.cookie.split('; ');
    for (var i=0; i< arr.length; i++) {
      var cleaned = arr[i].split('=');
      var cleanedCookieKey = cleaned[0];
      var cleanedCookie = cleaned[1];
      // shortlyID.push(cleanedCookie);
      req.cookies[cleanedCookieKey] = cleanedCookie;
    }
  } else {

  }

  next();
};

module.exports = parseCookies;
