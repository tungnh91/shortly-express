var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {

  GET: function(callback){
    var queryString = 'SELECT * FROM users';
    db.query(queryString, function(err, results){
      callback(err, results);
    });
  },

  POST: function(params, callback){
    var queryString = 'INSERT IGNORE INTO users SET ?';
    db.query(queryString, params, function(err, results){
      callback(err, results);
    });
  }

};
