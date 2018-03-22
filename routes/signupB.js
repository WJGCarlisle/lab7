
/*
 * GET sign up B.
 */

var data = require("../public/json/data.json");

exports.addUser = function(req, res){
	data['viewAlt'] = true;
	var user = {
		"name": req.query.name,
		"username": req.query.username,
		"password": req.query.password,
		"meetingsCreated": [],
		"meetingsJoined": [],
		"friends": []
	}

	data.users.push(user);

 	res.render('homeB', data);
};