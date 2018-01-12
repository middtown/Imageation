const express = require('express');
const router = express.Router();

let photoController = require('../controllers/photo');

router.get('/', getImages);


// router.get('/latest', (req, res) => {
// });

// router.get('/search/:q', (req, res) => {
// });

//Cargo form
//router.get('/cargo/new', cargoController.new);

//Add new cargo
//router.post('/cargo', cargoController.create);

// app.get('/', function homepage (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

// app.get('/api', function api_index(req, res) {
//   // TODO: Document all your api endpoints below
//   res.json({
   
//   });
// });

module.exports = router;