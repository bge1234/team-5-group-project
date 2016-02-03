var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var apiKey = process.env.MEETUP_API_KEY;
var unirest = require('unirest');
var validate = require('../lib/validations');

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
  Freebies().select().then(function(results) {
    unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + apiKey)
     .end(function(response) {

       var meetups = response.body.results;
       var startDates = [];
       var endDates = [];

      for (var i = 0; i < meetups.length; i++) {
        date = new Date(meetups[i]["time"]);
        var dateString = date.toString().split(' ');
        var month = getMonth(dateString[1]).toString();
        var day = dateString[2];
        var year = dateString[3];
        var time = dateString[4];
        startDates.push(month + '/' + day + '/' + year + ' ' + time);
      }

      for (var i = 0; i < meetups.length; i++) {
        if(meetups[i]["duration"]) {
          date = new Date(meetups[i]["time"] + meetups[i]["duration"]);
          var dateString = date.toString().split(' ');
          var month = getMonth(dateString[1]).toString();
          var day = dateString[2];
          var year = dateString[3];
          var time = dateString[4];
          endDates.push(month + '/' + day + '/' + year + ' ' + time);
        }
        else
          endDates.push("Not provided");
      }
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
  var errors=[];
  errors.push(validate.nameIsNotBlank(req.body.name));
  errors.push(validate.locationIsNotBlank(req.body.location));
  errors.push(validate.startDateIsNotBlank(req.body.start_date));
  errors.push(validate.detailsNotBlank(req.body.text));
  errors.push(validate.urlNotBlank(req.body.url));
    errors = errors.filter(function(error) {
      return error.length;
    })
      if (errors.length) {
        res.render('freebies/new', {errors: errors, info: req.body})
      } else {
  Freebies().insert(req.body).then(function(results) {
    res.redirect('/freebies');
    });
  };
});

module.exports = router;
