//server/routes/routes.js
import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
  res.render('index')
});

module.exports = router;
