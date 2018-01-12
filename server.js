// SERVER-SIDE JAVASCRIPT
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
//Set up EJS -- look at those views
app.set('views', __dirname + '/public');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/************
 * DATABASE *
 ************/

var db = require("./models");

// //req.session.passport.user.id FTW!
// app.get('/newSession', function(req,res){
// 	let options = {
// 		url: 'https://imgur.com/t/sunset',
// 		auth:{
// 			bearer: bearerToken
// 		}
// 	};
// });


var http = require("https");

var options = {
				"method": "POST",
				"hostname": [
				"api",
				"imgur",
				"com"
  			],
				"path": [
    			"oauth2",
    			"token"
  			],
  				"headers": {
  				"Authorization": "Client-ID {{clientId}}"
  			}
};

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.write("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"refresh_token\"\r\n\r\n{{refreshToken}}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"client_id\"\r\n\r\n{{clientId}}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"client_secret\"\r\n\r\n{{clientSecret}}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"grant_type\"\r\n\r\nrefresh_token\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
// req.end();
// /**********
//  * SERVER *
//  **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
