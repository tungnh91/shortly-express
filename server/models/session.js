var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here

module.exports = {

  GET: function(params, callback) {

  },

  POST: function(params, callback) {
    if (params === undefined) {
      var salt = util.generateSalt();
      var queryString = '';
      db.query(queryString);
    }
  }


};
