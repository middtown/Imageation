const express = require('express');
const router = express.Router();

let cargoController = require('../controllers/cargo');


//Cargo form
router.get('/cargo/new', cargoController.new);

//Add new cargo
router.post('/cargo', cargoController.create);


module.exports = router;