/*
 * GET delete meeting.
 */

var meetingsCreated = require("../public/json/meetingsCreated.json");

exports.delete = function(req, res){
	var meeting = req.query.deleteMeeting;
	var count = 0;
	//delete meetingsCreated.meetingsCreated.meeting;
	for(var obj in meetingsCreated.meetingsCreated) {
		if(String(meetingsCreated.meetingsCreated[obj].meetingName) === String(meeting)) {
			break;
		}
		count++;
	}

	meetingsCreated.meetingsCreated.splice(count,1);

	res.render('meetingsCreated', meetingsCreated);
};