// Load required packages
var mongoose = require('mongoose');

// Define our image schema
var imageSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String }
});

// Export the Mongoose model
module.exports = mongoose.model('Img', imageSchema);