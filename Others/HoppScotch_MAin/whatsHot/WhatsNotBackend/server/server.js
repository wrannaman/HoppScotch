// API must be configured and built after startup!
Meteor.startup(function () {

  // Global configuration
  Restivus.configure({
    useAuth: false,
    prettyJson: true
  });

  // Generates: GET, POST, DELETE on /api/items and GET, PUT, DELETE on
  // /api/items/:id for Items collection
  Restivus.addCollection(Places);
  Restivus.addRoute('places/:searchResults', {authRequired: false}, {
    get: function () {
      // post obj w id's of all places. 
      console.log('get');
      var points = Places.find({});

      if (points) {
        
        return {status: 'success', data: points};
      }      
      return {
        statusCode: 404,
        body: {status: 'fail', message: 'Places not found'}
      }
    },
    post: {
      // roleRequired: ['author', 'admin'],
      action: function () {
        console.log('post');
        console.log(this.urlParams);
        console.log(this);
      }
    },
    delete: {
      //roleRequired: 'admin',
      action: function () {
        // if (Posts.remove(this.urlParams.id)) {
        //   return {status: "success", data: {message: "Item removed"}};
        // }
        return {
          statusCode: 404,
          body: {status: "fail", message: "Nothing to do here || not found"}
        };
      }
    }
  });

  Restivus.addCollection(Points);
  // Maps to: /api/posts/:id
  Restivus.addRoute('points/:lat/:long', {authRequired: false}, {
    get: function () {
      var points = Points.find({});

      if (points) {
        
        return {status: 'success', data: points};
      }      
      return {
        statusCode: 404,
        body: {status: 'fail', message: 'Points not found'}
      };
    },
    post: {
      // roleRequired: ['author', 'admin'],
      action: function () {
        console.log(this.urlParams);
        var lat = this.urlParams.lat;
        var long = this.urlParams.long;

        if (!lat || !long) {
          return {
            statusCode: 404,
            body: {status: 'fail', message: 'Nothing sent not found'}
          }
        } else if (lat == 0 && long == 0) {
            return {status: 'success', data: ""};
        } else {
          Points.insert({lat: lat, long: long, date: new Date()})
          return {status: 'success', data: ""};
        }
      }
    },
    delete: {
      //roleRequired: 'admin',
      action: function () {
        // if (Posts.remove(this.urlParams.id)) {
        //   return {status: "success", data: {message: "Item removed"}};
        // }
        return {
          statusCode: 404,
          body: {status: "fail", message: "Nothing to do here || not found"}
        };
      }
    }
  });

  Restivus.addCollection(Messages);
  // Maps to: /api/messages/:id
  Restivus.addRoute('messages/:lat/:long/:message/:points/:id', {authRequired: false}, {
      get: function () {
          var allArray = [];
          var lat = this.urlParams.lat;
          var long = this.urlParams.long;
          var messages = Messages.find({}).fetch();
          var resultsArray=[];
          
          for (var i=0;i<messages.length; i++) {
          console.log('********** Looping ****************')
          // console.log(lat, long, messages[i].latLeft, messages[i].latRight, messages[i].longBottom, messages[i].longTop)
            if (lat >= messages[i].latLeft && lat <= messages[i].latRight && long<=messages[i].longBottom && long>= messages[i].longTop) {   // for real life
            //if (lat >= messages[i].latLeft && lat <= messages[i].latRight && long >= messages[i].longBottom && long <= messages[i].longTop) {  // for iphone sim
                console.log('********** got one ****************')
                resultsArray.push({
                    "message":  messages[i].message,
                    "points":   messages[i].points,
                    "date":     messages[i].date,
                    "_id":      messages[i]._id
                });
           }
          }
          
        console.log('^^^^^^^^^^^^^^^^^^')
        console.log(resultsArray);
        console.log('^^^^^^^^^^^^^^^^^^')
        
        if (resultsArray) {
          return {status: 'success', data: resultsArray};
        }      
        
        return {
          statusCode: 404,
          body: {status: 'fail', message: 'Messages not found'}
        };
      },
    post: {
        // roleRequired: ['author', 'admin'],
        action: function () {
          console.log(this.urlParams);
          var message = this.urlParams.message;
          var points = this.urlParams.points;
          var lat = this.urlParams.lat;
          var long = this.urlParams.long;
          var id = this.urlParams.id;

          if (id != 0) {
            console.log("************** Message is an update");
            var points = this.urlParams.points;
            var message = Messages.findOne({_id:id});
            var newPoints = Number(message.points) + Number(points);
            return Messages.update({_id:id}, {$set: {points: newPoints}});
          } else {
            console.log("************** Message is new");
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
              var longTop = Number(long) + ((1/(69.17*Math.cos(Number(lat)))) * Number(radius)*.25);
              var longBottom = Number(long) - ((1/(69.17*Math.cos(Number(lat)))) * Number(radius)*.25);

              //esape message
              var safeMessage = message.replace(/[^a-zA-Z0-9\!\?\#\s\&\.\,\+\-\@\$\'\*]/g, '');

              
              if (!lat || !long || !message) {
                return {
                  statusCode: 404,
                  body: {status: 'fail', message: 'Nothing sent not found'}
                }
              } else {
                Messages.insert({
                  "message": safeMessage,
                  "points": 0,
                  "latRight": latRight,
                  "latLeft": latLeft,
                  "longTop": longTop,
                  "longBottom": longBottom,
                  "date": new Date()
                });
                return {status: 'success', data: ""};
              }
            }
          }
      },
    put: {
      action: function () {
        console.log('put');
        console.log(this.urlParams.id);
        var id = this.urlParams.id
        var points = this.urlParams.points;
        var message = Messages.findOne({_id:id});
        var newPoints = Number(message.points) + Number(points);
        Messages.update({_id:id}, {$set: {points: newPoints}});
      }
    },
    delete: {
      //roleRequired: 'admin',
      action: function () {
        // if (Posts.remove(this.urlParams.id)) {
        //   return {status: "success", data: {message: "Item removed"}};
        // }
        return {
          statusCode: 404,
          body: {status: "fail", message: "Nothing to do here || not found"}
        };
      }
    }
  });
});

//remove old gps points
var cleanUpPoints = function () {
  var points = Points.find({}).fetch();
  console.log('cleaning!')
  for (var i=0; i<points.length; i++) {
    console.log('difference for ' + i + " is : " + Number( moment(points[i].date).add('4', 'h')-moment(new Date()))/3600000);
    if (Number( moment(points[i].date).add('4', 'h')-moment(new Date())) <= 0 ) {
      console.log('true, delete');
      Points.remove({_id: points[i]._id});
    }
  }
  Meteor.setTimeout(function () {
    cleanUpPoints();
  },1000*60*60); // run once an hour
} // end cleanUpPoints

// remove old messages
var cleanUpMessages = function () {
  var messages = Messages.find({});
  
  for (var i=0; i<messages.length; i++) {
    console.log('difference for ' + i + " is : " + Number( moment(messages[i].date).add('4', 'h')-moment(new Date()))/3600000);
    if (Number( moment(messages[i].date).add('4', 'h')-moment(new Date())) <= 0 ) {
      console.log('true, delete');
      Messages.remove({_id: messages[i]._id});
    }
  }

  Meteor.setTimeout(function () {
    cleanUpPoints();
    cleanUpMessages();
  },1000*60*60); // run once an hour
} // end clean up messages
  
cleanUpPoints();
cleanUpMessages();