var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function freebies(){
 return knex('freebies');
};

function users(){
 return knex('users');
};

function categories(){
 return knex('categories');
};

function admin(){
 return knex('admin');
};

// get activites and maps page
router.get('/', function(req, res, next) {
  freebies().select().then(function(results) {
    res.render('freebies/index', {freebies: results});
  })
});

// show add freebies page
router.get('/new', function(req, res, next) {
  res.render('freebies/new');
});

// add freebies
router.post('/', function(req, res, next) {
  var newFreebie = {
    name: req.body.name,
    location: req.body.location,
    details: req.body.details
  };
  freebies().insert(newFreebie).then(function(results) {
    res.redirect('/freebies');
  })
});

// edit freebies
router.get('/:id/edit', function(req, res, next) {
  freebies().where('id', req.params.id).first().then(function(results) {
    res.render('freebies/edit', {freebies: results});
  })
});

// post edit freebies
router.post('/:id', function(req, res, next) {
  freebies().where('id', req.params.id).update(req.body).then(function(results) {
    res.redirect('/freebies');
  })
});


// delete freebies
router.get('/:id/delete', function(req, res, next) {
  freebies().where('id', req.params.id).del().then(function(results) {
    res.redirect('/freebies');
  })
});

module.exports = router;
