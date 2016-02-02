var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var apiKey = process.env.MEETUP_API_KEY;
var unirest = require('unirest');

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
  freebies().select().first().then(function(results) {
    unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + apiKey)
     .end(function(response) {
       var meetups = response.body.results;
        res.render('freebies/index', {freebies: results, events: meetups});
    })
  })
});

// show add freebies page
router.get('/new', function(req, res, next) {
  res.render('freebies/new');
});

// add freebies
router.post('/', function(req, res, next) {
  freebies().insert(req.body).then(function(results) {
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
