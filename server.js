// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var magmaController = require('./controllers/magma');
//var util = require('util');
//var fs = require('fs-extra');
//var qt = require('quickthumb');
//var formidable = require('formidable');

// Connect to the magma MongoDB
MONGOLAB_URI="mongodb://admin:admin@ds061415.mongolab.com:61415/magma"
//mongoose.connect('mongodb://localhost:27017/magma');
mongoose.connect(MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

// Create our Express application
var app = express();

// Use the body-parser package in oour application
app.use(bodyParser.urlencoded({
	extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /
app.get('/', function (req, res) {
    res.status(200).json({msg: 'OK' });
  });

// Create endpoint handlers for /api
app.get('/api', function (req, res) {
    res.status(200).json({msg: 'OK' });
  });

// Create endpoint handlers for /magmas
router.route('/magma')
	.get(magmaController.getMagmas)
	.post(magmaController.postMagmas);

// Create endpoint handlers for /magma/:magma_id
router.route('/magma/:magma_id')
	.get(magmaController.getMagma)
	.put(magmaController.putMagma)
	.delete(magmaController.deleteMagma);
/*
app.post('/api/upload', function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		res.writeHead(200, {'context-type': 'text/plain'});
		res.write('received upload:\n\n');
		res.end(util.inspect({fields: fields, files: files}));
	});
	form.on('end', function(fields, files){
		//// Temporary location of our uploaded file 
    	var temp_path = this.openedFiles[0].path;
    	// The file name of the uploaded file 
    	var file_name = this.openedFiles[0].name;
    	// Location where we want to copy the uploaded file 
    	var new_location = 'uploads/';

    	fs.copy(temp_path, new_location + file_name, function(err) {  
      		if (err) {
        		console.error(err);
      		} else {
        		console.log("success!")
      		}
      	});
	});
});*/

// Show the upload form	
app.get('/api/upload', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">Add a title: <input name="title" type="text" /><br><br><input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
  res.end(form); 
}); 

// Register all our routes with /api
app.use('/api', router);

// Start the server
.listen(process.env.PORT || 5000);
//app.listen(3000);
console.log('Insert magma on port ' + 3000);
