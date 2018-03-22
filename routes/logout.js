/*
 * GET logout.
 */

var meetingsCreated = require("../public/json/meetingsCreated.json");
var data = require('../public/json/data.json');

exports.logout = function(req, res){
	data['viewAlt'] = false;
	while(meetingsCreated.meetingsCreated.length !== 0) {
		meetingsCreated.meetingsCreated.pop();
	}

	res.render('index',data);
};