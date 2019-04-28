var express = require('express');
var router = express.Router();
var paginate = require('../helpers/pagination.js');
var mongodb = require('mongodb');
var http = require('http');

var file_variable = [];

/************************************************ */
//const express = require('express');
const config = require('./../config');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


var mongo = require('mongodb');

var fs = require('fs');
var DIR = './uploads/';




var storage3 = multer.diskStorage({
    destination: DIR,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var uploadimageinfolder= multer({ storage: storage3 }).single('file');



exports.manualimageupload=function (req, res) {
    // DIR=req.file.destination
    uploadimageinfolder(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
}

