// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var MagmaSchema = new mongoose.Schema({
	title: String,
	description: String,
	gps: String
});

// Export the Mongoose model
module.exports = mongoose.model('Magma', MagmaSchema);