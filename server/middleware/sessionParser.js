var Sessions = require('../models/session');
var util = require('../lib/utility');
var express = require('express');
var app = express();

var createSession = function(req, res, next) {
  if (Object.keys(req.cookies).length !==0) {
    if (typeof req.cookies === 'object') {

      console.log("I like to know what this hash is?");
      req.session = {};
      req.session['hash'] = req.cookies;

    } else {
      var arr =  req.cookies.split('; ');
      for (var i=0; i< arr.length; i++) {
        var cleaned = arr[i].split('=');
        var cleanedCookieKey = cleaned[0];
        var cleanedCookie = cleaned[1];
        res.cookies[cleanedCookieKey] = cleanedCookie;
        //generate hash
        //store it in db
      }
    }
  } else {
    var agent = req.get('User-Agent');
    var salt = util.generateSalt();
    var hash = util.randomizePassword (agent, salt);
    req.session = { hash : hash };

    if (!res.cookies.shortlyid) {
        return Sessions.initialize(agent).then(function(hash) {
        res.cookie('shortlyid', hash);
        next();
      });
      //res.cookies['shortlyid'] = { value: 2 };
    }
    // console.log(" >>>>>>>>> ", res.cookies, " <<<<<<<<<<");
    Sessions.GET(res.cookies.shortlyid).then(function(session) {
      console.log('DID WE GET HERE???????', session);
    if (!session) {
      res.clearCookie('shortlyid');
      return next();
    }

    if (!util.compareHash(agent, session.hash, session.salt)) {
      return Sessions.destroySession(session.hash)
        .then(function() {
          res.clearCookie('shortlyid');
          next();
        });
    }

    req.session = session;
    next();
  });






  }
  //if(res.cookies)
  //console.log('this is the response ((((((((((((((((()))))))))))))))))', res)
  next();
}

module.exports = createSession;
