/*
 * GET home page.
 */

var meetingsCreated = require("../public/json/meetingsCreated.json");
var data = require("../public/json/data.json");

exports.view = function(req, res){
  data['viewAlt'] = true;
  res.render('homeB', meetingsCreated);
};