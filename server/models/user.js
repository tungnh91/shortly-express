var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {

  GET: function(callback) {
    var queryString = 'SELECT * FROM users';
    db.query(queryString, function(err, results) {
      callback(err, results);
    });
  },

  POST: function(params, callback) {
    // console.log(" is this the problem???? tell me john ====>  0  <====");
    var salt = utils.generateSalt();
    // console.log('(((((((((((((())))))))))))))',salt);
    var queryString = 'INSERT INTO users SET ?';
    // console.log('******************************', params);
    var temp = utils.randomizePassword(params.password, salt);
    var newParams = {
      username: params.username,
      password: temp,
      salt: salt
    };
    // console.log('this is newParams ===================>  ', newParams, '\n');
    db.query(queryString, newParams, function(err, results) {
      console.log("testing results: ", results);
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

};
