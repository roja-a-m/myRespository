var express = require('express'),
    _ = require('lodash'),
    config = require('./config'),
    jwt = require('express-jwt');
var router = express();


var datasets_controller = require('./controllers/datasetsController.js')

var JWTroute = require('./authentication/JWTcontroller.js');

var multer = require('multer');




router.post('/api/datasetss/manualimageupload', datasets_controller.manualimageupload);

module.exports = router;




