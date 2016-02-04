var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var apiKey = process.env.MEETUP_API_KEY;
var unirest = require('unirest');
var dates = require('../lib/dates');

function Freebies(){
 return knex('freebies');
};

function Users(){
 return knex('megausers');
};

function Categories(){
 return knex('categories');
};

function Admin(){
 return knex('admin');
};

// get activites and maps page
router.get('/', function(req, res, next) {
  Freebies().select().then(function(results) {
    unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + apiKey)
     .end(function(response) {

      var meetups = response.body.results;
      var startDates = dates.starts(meetups);
      var endDates = dates.ends(meetups);

      res.render('freebies/index', {freebies: results, events: meetups, startDates: startDates, endDates: endDates});
    })
  })
});

// show add freebies page
router.get('/new', function(req, res, next) {
  res.render('freebies/new');
});

// add freebies
router.post('/', function(req, res, next) {
  Freebies().insert(req.body).then(function(results) {
    res.redirect('/freebies');
  });
});

module.exports = router;
