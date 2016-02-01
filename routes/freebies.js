var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function freebies(){
 return knex('freebies')
};

function users(){
 return knex('users')
};

function sub_categories(){
 return knex('sub_categories')
};

function top_categories(){
 return knex('top_categories')
};

// get activites and maps page
router.get('/', function(req, res, next) {
  freebies().select().then(function(results) {
    res.render('pages/freebies', {freebies: results});
  })
});

// show add freebies page
router.get('/new', function(req, res, next) {
  res.render('pages/new-freebie');
});

// add freebies
router.post('/', function(req, res, next) {
  var newFreebie = {
    name: req.body.name,
    location: req.body.location,
    details: req.body.details
  };
  freebies().insert(newFreebie).then(function(results) {
    res.redirect('/');
  })
});

// edit freebies
router.get('/:id/edit', function(req, res, next) {
  freebies().where('id', req.params.id).first().then(function(results) {
    res.render('pages/edit-freebie', {freebies: results});
  })
});

// post edit freebies
router.post('/:id', function(req, res, next) {
  freebies().where('id', req.params.id).update(req.body).then(function(results) {
    res.redirect('/');
  })
});


// delete freebies
router.get('/:id/delete', function(req, res, next) {
  freebies().where('id', req.params.id).del().then(function(results) {
    res.redirect('/');
  })
});

module.exports = router;
