var express = require('express');
var router = express.Router();
var request = require('request');
var categories = require('../db/lib/categories')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'FreeDenver.co' });
  res.redirect('/freebies');
});

// about us page
router.get('/about', function(req, res, next) {
  res.render('info/about');
});

// contact us page
router.get('/contact', function(req, res, next) {
  res.render('info/contact');
});

// contact us page
router.get('/map', function(req, res, next) {
  res.render('maptest', {lat: 39.757785, lng: -105.007142});
});

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
