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
  res.render('signup' , {error : req.flash('error')});
});


router.post('/', function(req, res, next) {

  console.log(req.body);
  const newuser = new userModel({
    username : req.body.username,
    email : req.body.email
  });

  const regUser = userModel.register( newuser, req.body.password );
  regUser.then(()=>{passport.authenticate('local')(req,res,()=>{res.redirect('/profile')})})
  .catch((err)=>{
    req.flash('error', 'user already exist' );
    res.redirect('/');
  });

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
