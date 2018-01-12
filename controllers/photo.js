let db = require('../models');

//controller function to look at new and all photos... exports to routes.js as a callback function.
function allPhotos (req, res) { //look at that controller
	res.render('allPhotos'); 
}

//controller function to create cargo... exports to routes.js as a callback function.
function createCargo (req, res) { //and look at that controller
	db.Cargo.create({description: req.body.description, title: req.body.title}, function(error, cargo) {
		res.render('cargoShow', {cargo: cargo});
	});
}

module.exports.new = newCargo; //exports as a object with new specified... prefered method or syntax by js devs.
//module.exports.create = createCargo; //exports as a object with create specified... prefered method or syntax by js devs.
