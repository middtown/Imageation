//Set up DB -- look at those models
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/imageation");

module.exports.Photo = require("./photo");