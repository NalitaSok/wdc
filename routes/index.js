var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var users = {}; 
var sessions = {}; 

router.post('/userfile.json',function(req,res){
    
    var user = null;
    
    console.log(JSON.stringify(req.body)); 
})