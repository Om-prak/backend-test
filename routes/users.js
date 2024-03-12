var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');

const passport  = require('passport');
const LocalStrategy  = require('passport-local');
passport.use(new LocalStrategy(userModel.authenticate()));

/* GET users listing. */

router.get('/profile',checkAuthentication, function(req, res, next) {
  res.render('profile');
});


router.get('/', function(req, res, next) {
  res.render('signup');
});


router.post('/', function(req, res, next) {

  const newUser = new userModel({
  email : req.body.email,
  username : req.body.username  });

  userModel.register( newUser , req.body.password ).then(()=>{

    const auth = userModel.authenticate()(req,res,()=>{res.redirect('/profile')});

  });

  

});

router.get('/login', function(req, res, next) {
  
  res.render('login', {error : req.flash('error')});
  
});

router.post('/login', 
  passport.authenticate('local', { 
    
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true

   }));


router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}


module.exports = router;
