var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
     jwt     = require('express-jwt');

var app = express.Router();

// Validate access_token
var jwtCheck = jwt({
    secret: config.secret,
    audience: config.audience,
    issuer: config.issuer
  });
  
  // Check for scope
  function requireScope(scope) {
    return function (req, res, next) {
      if(!String(req.originalUrl).includes('/api/project/pojectImagedownload/') && !String(req.originalUrl).includes('/api/users/')  ){
      var has_scopes = req.user.scope === scope;
      if (!has_scopes) { 
          res.sendStatus(401); 
          return;
      }
      next();
    }
    else{
      next();
    }
    };
  }
  
var filter = function(req) {if(String(req.originalUrl).includes('/api/project/pojectImagedownload/') || String(req.originalUrl).includes('/api/users/') ){return true;}}
  
  // Check JWT is enable or not 
  if (config.enableJWT==true) {
      app.use('/api', jwtCheck.unless(filter), requireScope('full_access'));
  }

  module.exports = app;