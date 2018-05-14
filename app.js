var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/part3-2');
var db = mongoose.connection; 
//var logger = require('morgan');
var User = require('./models/user'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Init App 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'})); 
app.set('view engine', 'handlebars');


//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Set static folder 
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));  

//Passport initialisation
app.use(passport.initialize());
app.use(passport.session()); 

app.use(expressValidator({
    errorFormatter: function(param,msg,value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg : msg,
        value : value
    }; 
    }
})); 

//Connect Flash
app.use(flash()); 



app.use(function (req,res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next(); 
}); 

//Register User 
app.post('/register',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2; 
    
    //Validation
    req.checkBody('name', 'Name is required').notEmpty(); 
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty(); 
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password does not match').equals(req.body.password); 
    
    var errors = req.validationErrors(); 
    
    if(errors){
        res.render('register',{
            errors:errors
        }); 
    } else{
        var newUser = {
            name:name,
            email:email,
            username:username,
            id:null,
            password: password
        }; 
        
        User.createUser(newUser,function(err,user){
            if(err) throw err;
            console.log(user); 
        }); 
        
        req.flash('success_msg','You are registered and can now login');
        
        res.redirect('/login'); 
    }
});

app.use('/', indexRouter);

passport.use(new LocalStrategy(
	function (username, password, done) {
        console.log("Start"); 
		User.getUserByUsername(username, function (err, user) {
            console.log("Start1");
			if (err) throw err;
            console.log(user);  
			if (!user|| user===undefined) {
                console.log("user1");  
				return done(null, false, { message: 'Unknown User' });

			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
                    console.log("isMatch"); 
				} else {
					return done(null, false, { message: 'Invalid password' });
                    console.log("Invalid pass"); 
				}
			});
		});
	}));


passport.serializeUser(function (user, done) {
	done(null, user.username);
   // done(null,user); 
    console.log("serial"); 
});

passport.deserializeUser(function (id, done) {
	User.getUserByUsername(id, function (err, user) {
         console.log("deserial"); 
		done(err, user);
	});
}); 


app.use('/users', passport.authenticate('local', { failureRedirect: '/login' }), usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port')); 
}); 

module.exports = app;
