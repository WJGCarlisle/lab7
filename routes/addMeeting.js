/*
 * GET meeting created.
 */

var meetingsCreated = require("../public/json/meetingsCreated.json");
var data = require("../public/json/data.json");

exports.addMeeting = function(req, res){
  data['viewAlt'] = false;
  var newMeeting = {
  	"meetingLocation" : req.query.vicinity,
  	"address" : req.query.address,
  	"meetingName" : req.query.meetingName,
  	"time" : req.query.meetingTime,
  	"invited" : req.query.friend
  }

  meetingsCreated.meetingsCreated.push(newMeeting);
  res.render('home', meetingsCreated);
};
