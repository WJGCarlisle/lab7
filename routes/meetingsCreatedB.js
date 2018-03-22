/*
 * GET meetings createdB.
 */

var meetingsCreated = require("../public/json/meetingsCreated.json");
var data = require("../public/json/data.json");

exports.meetingsCreated = function(req, res){
  data['viewAlt'] = true;
  res.render('meetingsCreatedJoinedB', meetingsCreated);
};