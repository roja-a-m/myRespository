const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const app = express();

var mongo = require('mongodb');
//Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine' , 'html');


//Mongo URI
const mongoURI = "mongodb://10.123.146.225/DSP";

//Create connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;
conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('datasets');
})


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json());

/** Setting up storage using multer-gridfs-storage */
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'datasets'
          };
          resolve(fileInfo);
        });
      });
    }
  });

var upload = multer({ //multer settings for single upload
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
    //console.log("its uploading cheers")
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        //console.log("its uploading cheers1")
         res.json({error_code:0,err_desc:null});
    });
});

app.get('/file/:filename', function(req, res){
    gfs.collection('ctFiles'); //set collection name to lookup into
//console.log("its gett cheers")
    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
});

app.listen('3001', function(){
    ////console.log('running on 3001...');
});