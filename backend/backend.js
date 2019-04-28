// get the packages we need
var logger = require('morgan'),
	cors = require('cors'),
	http = require('http'),
	express = require('express'),
	errorhandler = require('errorhandler'),
	dotenv = require('dotenv'),
	bodyParser = require('body-parser');

var mongoose = require('mongoose');
var app = express();
var router = require('./routes.js');
var configuration = require('./config.json');
const methodOverride = require('method-override');
var jwt     = require('express-jwt');
var config  = require('./config');

var Prometheus = require('./util/prometheus');  
//  var port = process.env.PORT || 4201;
//  var port = process.env.PORT || 8080;


var port = process.env.PORT || 4202;
const Eureka = require('eureka-js-client').Eureka;

dotenv.load();

// Parsers
app.use(bodyParser.urlencoded({ extended: true, limit: '5000000mb' }));
app.use(bodyParser.json({ limit: '50000000mb' }));
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors()) // include before other routes 
app.use(methodOverride('_method'));

app.use(express.static('./uploads'))


// app.use(cors())
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(function (err, req, res, next) {
	if (err.name === 'StatusError') {
		res.send(err.status, err.message);
	} else {
		next(err);
	}
});

if (process.env.NODE_ENV === 'development') {
	app.use(logger('dev'));
	app.use(errorhandler())
}

// API ROUTES
app.use(router);


var server = http.createServer(app);
server.listen(port, function (err) {
	console.log('listening in http://localhost:' + port);
});
