var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {

  GET: function(params, callback) {
    // if(req.body)
    var queryUser = `select * from users where username = "${params.username}";`;
    // console.log(')))))))((((((((((row((((()))))))))))))))', queryUser);
    db.query(queryUser, function(err, results) {
      // console.log('errrrrr(((((((((((((())))))))))))))', err, results);
      if (err) {
        console.log('this is the route we are taking(((((((((((())))))))))))', results);
        callback(err, null);
      } else {
        if (results.length === 0) {
          callback(err, null, results.length);
        } else {
          var hashedPassword = utils.randomizePassword(params.password, results[0].salt);
          if (hashedPassword === results[0].password){
            callback(null, results, results.length);
          } else {
            //do something;
            callback(null, results, 0);
          }
          // db.query(queryPassword, function(err, results){
          //   if (err) {
          //     callback(err, null);
          //   } else {
          //     callback(null, results);
          //   }
          //});
        }
      }
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
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

};
