var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('signup');
});


router.post('/', function(req, res, next) {

  res.render('signup');

  });

router.get('/login', function(req, res, next) {
  
  res.render('login');
  
});

router.post('/login', function(req, res, next) {

  res.render('login');

  });


module.exports = router;
