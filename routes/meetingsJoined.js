
/*
 * GET home page.
 */

//var meetingsJoined = require("../meetingsJoined.json");

exports.meetingsJoined = function(req, res){
  res.render('meetingsJoined', {	"meetingsJoined": [
		{
			"meetingLocation": "string",
			"altitude": " alt ",
			"longitude": "long",
			"meetingName": "Geisel",
			"time": "2:00",
			"finished" : "false"			
		}
	]});
  //res.render('meetings', meetingsJoined);
};