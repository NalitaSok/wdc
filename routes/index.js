var express = require('express');
var router = express.Router();
var User = require('../models/user'); 

/* GET home page. */
router.get('/', /*ensureAuthenticated,*/ function(req, res) {
  res.render('index');
});




function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next(); 
    } else {
        req.flash('error_msg','You are not logged in');
        res.redirect('users/login'); 
    }
}

//Register
router.get('/register', function(req,res){
    res.render('register'); 
}); 

//Login
router.get('/login', function(req,res){
    res.render('login'); 
});




module.exports = router;

