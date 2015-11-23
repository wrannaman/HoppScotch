var express 	= require('express')
var path    	= require('path')
var mongo   	= require('mongodb')
var logger  	= require('morgan')
var db      	= require('monk')('localhost/nogo')
var bodyParser  = require('body-parser')
var moment  	= require('moment')
var routes  	= require('./routes/routes')
var http 	    = require('http')
var app     	= express()
var debug 	 	= require('debug')('nogo:server')
var routes 		= require('./routes/routes');

//allow from everywhere!
app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.sendStatus(200);

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/', function (req, res) {
  res.send('No Go Captain!');
})

// // catch 404 and send
// app.use(function(req, res, next) {
//   var err = new Error('Not Found!!!!!!!!!!!!!!!!!!!!!!!');
//   err.status = 404;
//   next(err);
// });

//Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
//app.listen(3000)