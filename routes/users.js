var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



//using local database 
router.post('/login',
	/*passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),*/
	function (req, res) {
		res.render('index');
    console.log("Working"); 
	});

router.get('/logout',function(req,res){
    req.logout();
    req.flash('success_msg','Youre logged out'); 
    
    res.redirect('/login'); 
}); 




module.exports = router;
