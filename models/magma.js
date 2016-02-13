// Load required packages
var mongoose = require('mongoose');

// Define our magma schema
var MagmaSchema = new mongoose.Schema({
	title: String,
	description: String,
	gps_latitude: String,
	gps_longitude: String
});

// Export the Mongoose model
module.exports = mongoose.model('Magma', MagmaSchema);