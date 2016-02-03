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

function getMonth(yearString) {
  if(yearString === "Jan")
    return 1;
  else if(yearString === "Feb")
    return 2;
  else if(yearString === "Mar")
    return 3;
  else if(yearString === "Apr")
    return 4;
  else if(yearString === "May")
    return 5;
  else if(yearString === "Jun")
    return 6;
  else if(yearString === "Jul")
    return 7;
  else if(yearString === "Aug")
    return 8;
  else if(yearString === "Sep")
    return 9;
  else if(yearString === "Oct")
    return 10;
  else if(yearString === "Nov")
    return 11;
  else
    return 12;
}

// get activites and maps page
router.get('/', function(req, res, next) {
  freebies().select().then(function(results) {
    unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + apiKey)
     .end(function(response) {

       var meetups = response.body.results;
       var dates = [];

        for (var i = 0; i < meetups.length; i++) {
          date = new Date(meetups[i]["time"]);
          var dateString = date.toString().split(' ');
          var month = getMonth(dateString[1]).toString();
          var day = dateString[2];
          var year = dateString[3];
          var time = dateString[4];
          dates.push(month + '/' + day + '/' + year + ' ' + time);
        }

        res.render('freebies/index', {freebies: results, events: meetups, dates: dates});
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
