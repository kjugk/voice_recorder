const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../public/dist/', 'index.html'));
});

router.get('/articles', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../public/dist/', 'index.html'));
});

router.get('/articles/new', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../public/dist/', 'index.html'));
});

router.get('/license', (req, res, next) => {
  const file = path.join(__dirname, '../../', 'LICENSE.txt');
  const text = fs.readFileSync(file);

  res.header('Content-Type', 'text/plain;charset=utf-8');
  res.send(text);
});

module.exports = router;
