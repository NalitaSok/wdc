var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
/*var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});*/ 

//var User = module.exports = mongoose.model('User', UserSchema);

var User = {"a":{
            name:"a",
            email:"email@gmail.com",
            username:"a",
            id:null,
            password: "a"
        }}; 


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        User['username'] = newUser;
            //newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
    console.log(username); 
    console.log("getUserUser"); 
    callback(null, User['username']);
}

module.exports.getUserById = function(id, callback){
    console.log("getUserID");
	//User.findById(id, callback);
    for(var i=0;i<user.keys.length;i++)
        {
            if(User[i].id == id)
                {
                    callback(null,User[i]); 
                }
        }
    callback(null,null); 
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    console.log("getUserPassword");
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}