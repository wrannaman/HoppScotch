var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('nothing, try /goodluck');
});
router.get('/goodluck', function(req, res, next) {
  res.send('got you again!');
});

module.exports = router;
