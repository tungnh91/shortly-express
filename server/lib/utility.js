var Promise = require('bluebird');
var request = Promise.promisify(require('request'), { multiArgs: true });
var crypto = require('crypto');

exports.getUrlTitle = function(url) {
  return request(url).then(function(response, html) {
    var tag = /<title>(.*)<\/title>/;
    var match = response[0].body.match(tag);
    var title = match ? match[1] : url;
    return title;
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/
// >>>>>> Tried to implement real salt, but failed
// exports.genRandomString = function(length){
//   console.log('this is genRandomString================>>>>>>>>> <<<<<<<', length);
//   console.log("console logging: ====>>>>>>>>",crypto.randomBytes(Math.ceil(length / 2)), 'type ooooooof', typeof crypto.randomBytes(Math.ceil(length / 2)) );
//   return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
// };

exports.randomizePassword = function(str) {
  console.log("why does it not work????/");
  var hash = crypto.createHash('md5')
                   .update(str)
                   .digest('hex');
  // return randomized Password
  console.log("llllllllllllll", hash);
  return hash;
};
