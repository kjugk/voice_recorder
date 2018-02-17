var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Voice Recorder' });
});

router.get('/new', function(req, res, next) {
  res.render('index', { title: 'Voice Recorder' });
});

module.exports = router;
