var db = require('../db');
var util = require('../lib/utility');


// Write you session database model methods here

module.exports = {

  GET: function(token) {
    console.log('DID WE GET HERE???????', token);

    var queryString = 'SELECT * FROM sessions WHERE hash = ?';

    return db.queryAsync(queryString, token).then(function(results) {
      console.log("no problema ===================================");
      var session = results[0][0];

      if (!session || !session.user_id) {
        return session;
      }

      return db.queryAsync('SELECT username FROM users WHERE id = ?', session.user_id).then(function(result) {
        session.user = result[0][0];
        return session;
      });
    });
  },

  POST: function(params, callback) {
    if (params === undefined) {
      var salt = util.generateSalt();
      var queryString = '';
      db.query(queryString);
    }
  },

  destroySession: function(token) {
    console.log("DID IT EVER GET INVOKED???", token);
    var queryString = 'DELETE FROM sessions WHERE hash = ?';
    return db.queryAsync(queryString, token);
  },

  initialize : function(agent) {
    var salt = util.generateSalt();
    var hash = util.randomizePassword(agent, salt);

    var queryString = 'INSERT INTO sessions SET ?';
    return db.queryAsync(queryString, { hash: hash, salt: salt }).return(hash);
  }
};
