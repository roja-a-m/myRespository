const express = require('express')
const helmet = require('helmet')
const app = express()
const port = 9801
var server = require('http').createServer(app)
var path_1 = require("path");

var username = ''
var DIST_FOLDER = path_1.join(process.cwd(), 'dist');
app.use(helmet());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	//res.header("Access-Control-Allow-Origin", "http://localhost:9801");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(function (req, res, next) {
  var nodeSSPI = require('node-sspi')
  var nodeSSPIObj = new nodeSSPI({
	offerSSPI:true,
    retrieveGroups: true
  })
  
  nodeSSPIObj.authenticate(req, res, function(err){
	username = JSON.stringify(req.connection.user)

    res.finished || next()
  })
})

app.get('/username', function(req, res, next){
    res.setHeader("Content-Security-Policy", "script-src 'self' ");
    res.send(username)
    //res.json({ 'username' : username})
	
});
//var _a = require('./server/main'), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path_1.join(DIST_FOLDER, ''));
//app.get('/', (req, res) => res.send('Hello '+req.connection.user))
app.get('*.*', express.static(path_1.join(DIST_FOLDER, ''), {

    maxAge: '1y'

}));

// All regular routes use the Universal engine
app.get('*', function(req, res, next){
    
    res.render('index.html', { req: req });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))