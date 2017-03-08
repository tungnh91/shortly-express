var Sessions = require('../models/session');
var util = require('../lib/utility');
var express = require('express');
var app = express();
var createSession = function(req, res, next) {
  if (Object.keys(req.cookies).length !==0) {
    var arr =  req.cookies.split('; ');
    for (var i=0; i< arr.length; i++) {
      var cleaned = arr[i].split('=');
      var cleanedCookieKey = cleaned[0];
      var cleanedCookie = cleaned[1];
      res.cookies[cleanedCookieKey] = cleanedCookie;
      //generate hash
      //store it in db
    }
  } else {
    console.log('did this run????????????????????')
    req.session = { hash : 1 };

    res.cookies['shortlyid'] = { value: 1};
    // check hash
    //compare against db
      // if match, skip login
      // not, 303 login.
  }
  //if(res.cookies)
  //console.log('this is the response ((((((((((((((((()))))))))))))))))', res)
  next();
};

module.exports = createSession;
