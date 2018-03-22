
/*
 * GET meetings created.
 */

var meetingsCreated = require("../public/json/meetingsCreated.json");
var data = require("../public/json/data.json");

exports.meetingsCreated = function(req, res){
  data['viewAlt'] = false;
  res.render('meetingsCreated', meetingsCreated);
};
