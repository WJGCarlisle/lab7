
/*
 * GET login.
 */

var data = require("../public/json/data.json");

exports.view = function(req, res){
	data['viewAlt'] = false;
 	res.render('index',data);
};

exports.viewAlt = function(request, response){
	data['viewAlt'] = true;
  	response.render('index', data);
};