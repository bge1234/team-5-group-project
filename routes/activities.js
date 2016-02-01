var express = require('express');
var router = express.Router();

// get activites and maps page
router.get('/', function(req, res, next) {
  res.render('pages/activities');
});

// add event
router.post('/', function(req, res, next) {
  res.redirect('/');
});

// edit event
router.get('/:id/edit', function(req, res, next) {
  res.render('pages/edit-event');
});

// post edit event
router.post('/:id', function(req, res, next) {
  res.redirect('/');
});


// delete event
router.get('/:id/delete', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
