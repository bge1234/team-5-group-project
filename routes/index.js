var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FreeDenver.co' });
});

// sign in page
router.get('/sign-in', function(req, res, next) {
  res.render('login/sign-in');
});

// sign up page
router.get('/sign-up', function(req, res, next) {
  res.render('login/sign-up');
});

// about us page
router.get('/about', function(req, res, next) {
  res.render('info/about');
});

// contact us page
router.get('/contact', function(req, res, next) {
  res.render('info/contact');
});



module.exports = router;
