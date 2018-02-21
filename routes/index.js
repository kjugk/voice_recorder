var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Voice Recorder' });
});

router.get('/new', function(req, res, next) {
  res.render('index', { title: 'Voice Recorder' });
});

router.get('/license', function(req, res, next) {
  const file = path.join(__dirname, '../', 'LICENSE.txt');
  const text = fs.readFileSync(file);

  res.header('Content-Type', 'text/plain;charset=utf-8');
  res.send(text);
});

module.exports = router;
