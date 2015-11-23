var express = require('express');
var router = express.Router();
var moment = require('moment');
// var passport = require('passport'),
// LocalStrategy = require('passport-local').Strategy;
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/whatshot');
// var users = db.get('users');
// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt')
// var SALT_WORK_FACTOR = 12


// mongoose.connect('localhost', 'whatshot');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback() {
// 	console.log(users.find({`}))
//   console.log('Connected to DB');
// });

// // User Schema
// var userSchema = mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true},
//   lat: {type: Number, required: true},
//   long: {type: Number, required: true},
//   role: { type: String, required: true},
// });

// // Bcrypt middleware
// userSchema.pre('save', function(next) {
// 	var user = this;

// 	if(!user.isModified('password')) return next();

// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
// 		if(err) return next(err);

// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			if(err) return next(err);
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

// // Password verification
// userSchema.methods.comparePassword = function(candidatePassword, cb) {
// 	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
// 		if(err) return cb(err);
// 		cb(null, isMatch);
// 	});
// };



// //create a user



// // Passport session setup.
// //   To support persistent login sessions, Passport needs to be able to
// //   serialize users into and deserialize users out of the session.  Typically,
// //   this will be as simple as storing the user ID when serializing, and finding
// //   the user by ID when deserializing.
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// // Use the LocalStrategy within Passport.
// //   Strategies in passport require a `verify` function, which accept
// //   credentials (in this case, a username and password), and invoke a callback
// //   with a user object.  In the real world, this would query a database;
// //   however, in this example we are using a baked-in set of users.
// passport.use(new LocalStrategy(function(username, password, done) {
//   User.findOne({ username: username }, function(err, user) {
//     if (err) { return done(err); }
//     if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
//     user.comparePassword(password, function(err, isMatch) {
//       if (err) return done(err);
//       if(isMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Invalid password' });
//       }
//     });
//   });
// }));

// router.post('/createUser', function(req,res) {

// 	var User = mongoose.model('User', userSchema);
// 	var user = new User({ email: req.body.email , password: req.body.password , lat: req.body.lat, long: req.body.long, role: 'user' });
// 	user.save(function(err) {
// 	  if(err) {
// 	    console.log(err);
// 	  } else {
// 	    console.log('user: ' + user.email + " saved.");
// 	  }
// 	});
// });

// // /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Whats Not' });
// //   res.send('Hello Andrew');
// // });

// router.post('/login', passport.authenticate('local'), function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     console.log(JSON.stringify(req));
//     res.send(req.user);
// });

router.get('/getpoints', function(req, res, next){
	//console.log(req);
	console.log(req.db);
	var db = req.db;
	var collection = db.get('points');
	collection.find({},{},function(e,result){
		console.log(result);
		res.send(result);
	})
});

router.post('/getMessages', function(req, res) {
	var db = req.db;
	var allArray = [];
	console.log(req.body);
        var longitude = Number(req.body.long);
        var latitude = Number(req.body.lat);
        
	collection = db.get('messages');
	collection.find({},{}, function(e,result) {
		var resultsArray=[];
           for (var i=0;i<result.length; i++) {
           	console.log('********** Looping ****************')
           	console.log(latitude, longitude, result[i].latLeft, result[i].latRight, result[i].longBottom, result[i].longTop)
                if (latitude >= result[i].latLeft && latitude <= result[i].latRight && longitude<=result[i].longBottom && longitude>= result[i].longTop) {
                //if (latitude >= result[i].latLeft && latitude <= result[i].latRight && longitude <= result[i].longBottom && longitude >= result[i].longTop) {
                 
                    console.log('********** got one ****************')
                    resultsArray.push({
                        "message":  result[i].message,
                        "points":   result[i].points,
                        "_id":      result[i]._id,
                        "date": 	result[i].date
                      
                    });
                }
           }
           console.log('^^^^^^^^^^^^^^^^^^')
		console.log(resultsArray);
		console.log('^^^^^^^^^^^^^^^^^^')
		console.log(result);
		res.send(resultsArray);
	})
})

/* POST to Add User Service */
router.post('/setpoints', function(req,res){
	//set db var
	var db = req.db;
	console.log(req.body);

	//get form vals
	var lat = req.body.lat;
	var long = req.body.long;

	//set collection
	var collection = db.get('points');

	//submit to DB
	collection.insert({
		"lat": lat,
		"long": long,
		"date": new Date()
	}, function (err, doc){
		if (err) {
			res.send(err);
		} else {
			res.send(doc);
			//it worked
			// res.location('userlist');
			// res.redirect('userlist');
		}
	});

	// remove old points
	collection.find({},{},function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].date).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].date).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				collection.remove({_id: result[i]._id});
			}
		}
	})
});

/*POST to Message Service*/
router.post('/setMessage', function(req,res){
	//set db var
	var db = req.db;
	console.log(req.body);

	//get form vals
	var message = req.body.message;
	var id = req.body.id;
	var points = req.body.points;
	var lat = req.body.lat;
	var long = req.body.long;

	var radius = 10;

    // I dont kow why the .5 works but it does for 1 mile and 5 miles for where we are on the equator. fuck it. 
    var latRadius = Number(lat) + ((1/68.68) * Number(radius)*.5); 
    var longRadius = Number(long) + ((1/(69.17*Math.cos(Number(lat)))) * Number(radius)*.5);
    // I dont kow a better way to do this but I'm setting up a square arond the users address to imageine 
    // a circle with long top the top part of the circle and long bottom the bottom part of the circle
    // and lat left the left part of the circle and lat right the right part of the circle that way if 
    //the client is within that square we can return that walker. 
    var latRight = Number(lat) + ((1/68.68) * Number(radius)*.5); 
    var latLeft = Number(lat) - ((1/68.68) * Number(radius)*.5);
    var longTop = long + ((1/(69.17*Math.cos(Number(lat)))) * Number(radius)*.25);
    var longBottom = long - ((1/(69.17*Math.cos(Number(lat)))) * Number(radius)*.25);

	var safeMessage = message.replace(/[^a-zA-Z0-9\!\?\#\s\&\.\,\+\-\@\$\'\*]/g, '');

	//set collection
	var collection = db.get('messages');

	console.log(latRight, latLeft, longTop, longBottom);
	//submit to DB
	collection.insert({
		"message": safeMessage,
		"id": id,
		"points": points,
		"latRight": latRight,
		"latLeft": latLeft,
		"longTop": longTop,
		"longBottom": longBottom,
		"date": new Date()
	}, function (err, doc){
		if (err) {
			res.send(err);
		} else {
			res.send(doc);
			//it worked
			// res.location('userlist');
			// res.redirect('userlist');
		}
	});

	// remove old messages
	collection.find({},{},function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].date).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].date).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				collection.remove({_id: result[i]._id});
			}
		}
	})
});

/*POST to Increment Message*/
router.post('/incrementMessage', function(req,res){
	//set db var
	var db = req.db;
	console.log(req.body);

	//get form vals
	var id = req.body.id;
	var points = req.body.points;
	var inc = req.body.inc;
	if (inc == true) {
		points++;
	} else {
		points--;
	}
	

	//set collection
	var collection = db.get('messages');

	//submit to DB
	collection.update({"_id": id},{ $set: {'points': points}});
	

	// remove old messages
	collection.find({},{},function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].date).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].date).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				collection.remove({_id: result[i]._id});
			}
		}
	})
});
/*POST to Increment Message*/
router.post('/decrementMessage', function(req,res){
	//set db var
	var db = req.db;
	console.log(req.body);

	//get form vals
	var id = req.body.id;
	var points = req.body.points;
	
	Number(points)--
	
	

	//set collection
	var collection = db.get('messages');

	//submit to DB
	collection.update({"_id": id},{ $set: {'points': points}});
	

	// remove old messages
	collection.find({},{},function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].date).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].date).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				collection.remove({_id: result[i]._id});
			}
		}
	})
});
module.exports = router;
