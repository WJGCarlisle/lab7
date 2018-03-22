/*
 * GET new friend.
 */

var friends = require("../friends.json");
var data = require("../public/json/data.json");

exports.addFriend = function(req, res){
  data['viewAlt'] = true;
  var newFriend = {
  	"name" : req.query.name,
  	"username" : req.query.username
  }

  friends.friends.push(newFriend);
  res.render('friendsB', friends);
};