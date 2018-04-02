import * as express from 'express';
const router = express.Router();
import * as fs from 'fs';
import * as path from 'path';

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Voice Recorder' });
});

router.get('/articles', (req, res, next) => {
  res.render('index', { title: 'Voice Recorder' });
});

router.get('/articles/new', (req, res, next) => {
  res.render('index', { title: 'Voice Recorder' });
});

router.get('/license', (req, res, next) => {
  const file = path.join(__dirname, '../../', 'LICENSE.txt');
  const text = fs.readFileSync(file);

  res.header('Content-Type', 'text/plain;charset=utf-8');
  res.send(text);
});

export default router;
