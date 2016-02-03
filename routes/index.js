var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();
var request = require('request');

function Users() {
   return knex('megausers');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'FreeDenver.co' });
  res.redirect('/freebies');
});

router.get('/info/corporate-partner', function(req, res, next) {
  res.render('info/corporate-partner-info');
});

// post from splash page
router.post('/splash', function(req, res, next) {
  var categories = req.body.categories
  res.redierct('freebies/index',{category: category});
});

// show all megausers
router.get('/megausers', function(req, res, next) {
  Users().select().then(function(results) {
    res.render('megausers/index', {users: results});
  });
});

// about us page
router.get('/info/about', function(req, res, next) {
  res.render('info/about');
});

// contact us page
router.get('/info/contact', function(req, res, next) {
  res.render('info/contact');
});

// map page
router.get('/map', function(req, res, next) {
  res.render('map', {lat: 39.757785, lng: -105.007142});
});

// map page
router.get('/mapsearch', function(req, res, next) {
  request("https://maps.googleapis.com/maps/api/geocode/json?address=" + req.param('location').split(' ').join('+'), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jase = JSON.parse(body);
      var lat = jase["results"][0]["geometry"]["location"]["lat"];
      var lng = jase["results"][0]["geometry"]["location"]["lng"];
      res.render('map', { lat: lat, lng: lng });
    }
  });
});

module.exports = router;
