// SERVER-SIDE JAVASCRIPT
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const session = require("express-session");
const request = require("request");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs"); 
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
let behanceKey = require("./env.js");//key and clientId 
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + behanceKey;

// serve static files from public folder
app.use(express.static(__dirname + "/public"));

//Set up EJS -- look at those views
app.set("views", __dirname + "/public");
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

                              /************ Passport login begin *******************/

mongoose.connect("mongodb://localhost/local-authentication-with-passport"); 

app.use(morgan("dev")); 
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: "WDI-GENERAL-ASSEMBLY-EXPRESS" })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require("./config/passport")(passport);
  
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var routes = require("./config/routes");
app.use(routes);

                              /************ Passport login end *******************/


/************
 * DATABASE *
 ************/



/**********
 * MODELS *
 **********/

// project model and schema
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    cover: [String],
    title: String,
    name: String,
    field: String
});

var Project = mongoose.model("Project", ProjectSchema);

/**************
 * MIDDLEWARE *
 **************/
//get all projects
function getProjects(req, res){
	request(apiUrl, function (error, response, body) {
    let projectInfo = JSON.parse(body);
    for (var i = 0; i < projectInfo.projects.length; i++) {
      console.log(projectInfo.projects[i].name);
      res.send(projectInfo.projects[i]);
    }
  });
}

function getProjectsByIdea(req, res){
  let idea = "design";
  request(apiUrl+"&q=+"+idea, function (error, response, body) {
    let projectInfoByGenre = JSON.parse(body);
      for (var i = 0; i < projectInfoByGenre.projects.length; i++) {
        //console.log(projectInfoByGenre.projects[results].url);    
        res.send(projectInfo.projects);
      } 
  });
}

// function getProjectsByCity(req, res){
//   let city = "denver";
//   request(apiUrl+"&city="+city, function (error, response, body) {
//     let projectInfoByCity = JSON.parse(body);
//       for (var i = 0; i < projectInfoByCity.projects.length; i++) {
//         console.log(projectInfoByCity.projects[i].url);    
//         res.send(projectInfoByCity.projects);
//       } 
//   });
// }

// function getProjectsByTag(req, res){
//   let tag = "sketches";
//   request(apiUrl+"&tags="+tag, function (error, response, body) {
//     let projectInfoByTag = JSON.parse(body);
//       for (var i = 0; i < projectInfoByTag.projects.length; i++) {
//         console.log(projectInfoByTag.projects[i].url);    
//         res.send(projectInfoByTag.projects);
//       } 
//   });
// }


/**********
 * ROUTES *
 **********/
app.get("/api/projects", getProjects);
app.get("/api/projects/idea", getProjectsByIdea);

// app.get("/api/projects/city", getProjectsByCity);
// app.get("/api/projects/tag", getProjectsByTag);



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
