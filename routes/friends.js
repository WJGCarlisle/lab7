/*
 * GET home page.
 */

var friends = require("../friends.json");
var data = require("../public/json/data.json");

exports.view = function(req, res){
  data['viewAlt'] = false;
  res.render('friends', friends);
};

/*exports.addMeeting = function(req, res){
  res.render('index');
};*/