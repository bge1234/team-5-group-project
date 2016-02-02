var express = require('express');
var router = express.Router();

// sign in page
router.get('/login/sign-in', function(req, res, next) {
  res.render('login/sign-in');
});

// sign up page
router.get('/sign-up', function(req, res, next) {
  res.render('login/sign-up');
});

// partner with us link clicked
router.get('/partner/new', function(req, res, next) {
  res.render('partners/new');
});
module.exports = router;
