// Load the required packages
var Magma = require('../models/magma');


// Create endpoint /api/magmas for POSTS
exports.postMagmas = function(req, res){
	// Create a new instance of the Magma model
	var magma = new Magma();

	// Set the magma properties that came from the POST data
	magma.title = req.body.title;
	magma.description = req.body.description;
	magma.gps = req.body.gps;

	// Save the magma and check for errors
	magma.save(function(err){
		if (err)
			res.send(err);
		res.json({ message: 'Magma added to the DB!', data: magma});
	});
};



// Create endpoint /api/magma for GET
exports.getMagmas = function(req, res){
	// Use the magma model to find all magma
	Magma.find(function(err, magmas){
		if(err)
			res.send(err);
		res.json(magmas);
	});
};

// Create endpoint /api/magma/:magma_id for GET
exports.getMagma = function(req, res){
	// Use the Magma model to find a specific magma
	Magma.findById(req.params.magma_id, function(err, magma){
		if(err)
			res.send(err);
		res.json(magma);
	});
};

// Create endpoint /api/magma/:magma_id for PUT
exports.putMagma = function(req, res){
	// use the Magma model to find a specific magma
	Magma.findById(req.params.magma_id, function(err, magma){
		if(err)
			res.send(err);

		// Update the existing magma quantity
		magma.quantity = req.body.quantity;

		// Save the magma and check for errors
		magma.save(function(err){
			if (err)
				res.send(err);
			res.json(magma);
		});
	});
};

// Create endpoint /api/magma/:magma_id for DELETE
exports.deleteMagma = function(req, res){
	// Use the Magma model to find a specific magma and remove it
	Magma.findByIdAndRemove(req.params.magma_id, function(err){
		if (err)
			res.send(err);

		res.json({ message: 'Magma removed from the DB!' });
	});
};