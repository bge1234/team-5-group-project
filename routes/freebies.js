var express = require('express');
var knex = require('../db/knex');
var unirest = require('unirest');
var dates = require('../lib/dates');
var validate = require('../lib/validations');
var apiKey = process.env.MEETUP_API_KEY;
var router = express.Router();
var request = require('request');

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

// freebies all main page
router.get('/freebies', function(req, res, next) {
  Categories().select().then(function(categoryresults) {
    Freebies().select().then(function(results) {
      unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + apiKey)
       .end(function(response) {

        var meetups = response.body.results;
        var startDates = dates.starts(meetups);
        var endDates = dates.ends(meetups);

        res.render('freebies/index', {freebies: results, events: meetups, startDates: startDates, endDates: endDates, categories: categoryresults});
      })
    })
  });
});

// freebies sorted by category
router.get('/freebies/:categoryid', function(req, res, next) {
  Categories().select().then(function(categoryresults) {
    Freebies().where('category_id',req.params.categoryid).then(function(results) {
      unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + '3f7d255365182d12465e396b6267182e')
       .end(function(response) {

         var meetups = response.body.results;
         var startDates = dates.starts(meetups);
         var endDates = dates.ends(meetups);

         res.render('freebies/index', {freebies: results, events: meetups, lat: 39.757785, lng: -105.007142, categories: categoryresults, startDates: startDates, endDates: endDates, catID: parseInt(req.params.categoryid)});
      });
    });
  });
});

// get specific Partner's Public home page
router.get('/:username/freebies', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(result){
    Freebies().where('creator_id', result.id).then(function(results){
      res.render('partners/publicshow', {freebies: results, user: result});
    });
  });
});

// show a single Freebie
router.get('/:username/freebies/:id', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(result){
    Freebies().where('id', req.params.id).then(function(results){
      res.render('partners/publicshow', {freebies: results, user: result});
    });
  });
});

module.exports = router;
