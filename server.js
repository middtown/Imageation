// SERVER-SIDE JAVASCRIPT
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const session = require("express-session");
const request = require("request");
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let behanceKey = require('./env.js');//key and clientId 
let apiUrl = "http://www.behance.net/v2/collections/9866/projects?api_key="+behanceKey;

// serve static files from public folder
app.use(express.static(__dirname + "/public"));
//Set up EJS -- look at those views
app.set("views", __dirname + "/public");
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

/************
 * DATABASE *
 ************/


/**********
 * MODELS *
 **********/

var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    title: String,
    name: String,
    url: String,
    fields: [String],
    covers: [String],
    owners: [String]//check to see if i can go deep
});
var Project = mongoose.model('Project', ProjectSchema);

/**************
 * MIDDLEWARE *
 **************/

function getProjects(req, res){
	request(apiUrl, function (error, response, body) {
      //console.log("getProjects" + req + res);
    let projectInfo = JSON.parse(body);
  //Print out a list of projects
  console.log(projectInfo);
  console.log(projectInfo.name);
    //console.log(req.res);

  res.send(projectInfo.projects);
  console.log(typeof body);
});

}

/**********
 * ROUTES *
 **********/
app.get("/api/projects", getProjects);



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
