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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
let behanceKey = require('./env.js');//key and clientId 
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + behanceKey;

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

let Schema = mongoose.Schema;
let ProjectSchema = new Schema({
    title: String,
    name: String,
    url: String,
    fields: [String],
    covers: [String],
    owners: [String]//check to see if i can go this deep
});
let Project = mongoose.model('Project', ProjectSchema);

/**************
 * MIDDLEWARE *
 **************/

function getProjects(req, res){
	request(apiUrl, function (error, response, body) {
    let projectInfo = JSON.parse(body);
      Object.keys(projectInfo).forEach(function(key) {
        console.log(projectInfo[key]);
                //res.send(projectInfo.projects[0]);

      });
       // console.log( projectInfo.projects[0]);      

  });
}

function getProjectsByGenre(req, res){
  let genreReq = "design";

  request(apiUrl+"&q=+"+genreReq, function (error, response, body) {
    let projectInfoByGenre = JSON.parse(body);
      //Object.keys(projectInfoByGenre).forEach(function(element) {
      //});
        console.log("Found:" + projectInfoByGenre);
      
        res.send(projectInfoByGenre);
  });
}
/**********
 * ROUTES *
 **********/
app.get("/api/projects", getProjects);
app.get("/api/projects/genre", getProjectsByGenre);



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
