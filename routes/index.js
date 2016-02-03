var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();
var request = require('request');

function Users() {
   return knex('megausers');
}

function Categories(){
 return knex('categories');
};

/* GET splash page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'FreeDenver.co', categories: categories});
  // res.redirect('/freebies');
=======
  Categories().select().then(function(results) {
    res.render('index', {categories: results});
  });
});

// post from splash page
router.post('/splash', function(req, res, next) {
  var categoryid = req.body.category;
  res.redirect('/freebies/' + categoryid +'');
});

router.get('/info/corporate-partner', function(req, res, next) {
  res.render('info/corporate-partner-info');
});


// show all megausers
router.get('/megausers', function(req, res, next) {
  Users().select().then(function(results) {
    res.render('megausers/index', {users: results});
  });
>>>>>>> 7680de6d53a76e12b0ec6fedbda9126361750988
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
