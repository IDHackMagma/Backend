// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var Magma = require('./controller/magma');
var magmaController = require('./controllers/magma');

// Connect to the magma MongoDB
mongoose.connect('mongodb://localhost:27017/magma');

// Create our Express application
var app = express();

// Use the body-parser package in oour application
app.use(bodyParser.urlencoded({
	extended: true
}));

/*// Use environment defined port or 3000
var port = process.env.PORT || 3000;
*/
// Create our Express router
var router = express.Router();

// Create endpoint handlers for /magmas
router.route('/magma')
	.get(magmaController.getMagmas)
	.post(magmaController.postMagmas);

// Create endpoint handlers for /magma/:magma_id
router.route('/magma/:magma_id')
	.get(magmaController.getMagma)
	.put(magmaController.putMagma)
	.delete(magmaController.deleteMagma);

/*// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
	res.json({message: 'You are running dangerously low on magma!!' });
});
*/

/*// Create a new route with prefix /magma
var magmaRoute = router.route('/magma');

// Create endpoint /api/magma for POSTS
magmaRoute.post(function(req, res){
	// Create a new instance of the Magma model
	var magma = new Magma();

	// set the magma properties that came from the POST data
	magma.title = req.body.title;
	magma.description = req.body.description;
	magma.gps = req.body.gps;

	// Save the magma and check for errors
	magma.save(function(err){
		if (err)
			res.send(err);

		res.json({ message: 'Magma added to the locker!', data: magma });
	})
})

// Create endpoint /api/magma for GET
magmaRoute.get(function(req, res){
	// Use the Magma model to find all info
	Magma.find(function(err, magma){
		if(err)
			res.send(err);
		res.json(magma);
	});
});

// Create a new route with the /magma/:magma_id prefix
var magmaRoute = router.route('/magma/:magma_id');

// Create endpoint /api/magma/:magma_id for GET
magmaRoute.get(function(req, res){
	//use the Magma model to find a specific magma
	Magma.findById(req.params.magma_id, function(err, magma){
		if (err)
			res.send(err);
		res.json(magma);
	});
});

// Create endpoint /api/magma/:magma_id for PUT
magmaRoute.put(function(req, res){
	// Use the Magma model to find a specified magma
	Magma.findById(req.params.magma_id, function(err, magma){
		if (err)
			res.send(err);
		
		// Update the existing magma quantity
		magma.quantity = req.body.quantity;

		// Save the magma and check for errors
		magma.save(function(err){
			if(err)
				res.send(err);
			res.json(magma);
		});
	});
});

// Create endpoint /api/magma/:magma_id for DELETE
magmaRoute.delete(function(req, res){
	// Use the Magma model to find a specific magma and remove it
	Magma.findByIdAndRemove(req.params.magma_id, function(err){
		if (err)
			res.send(err);
		res.json({ message: 'Magma removed from the database!' });
	});
});
*/

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
//console.log('Insert magma on port ' + port);
