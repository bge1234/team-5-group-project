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
  Categories().select().then(function(results) {
    res.render('index', {categories: results});
  });
});

// post from splash page
router.post('/splash', function(req, res, next) {
  var categoryid = req.body.category;
  res.redirect('/freebies/' + categoryid +'');
});

// become a partner page
router.get('/info/become-a-partner', function(req, res, next) {
  Users().select().then(function(results) {
    res.render('info/become-a-partner', {users: results});
  });
});


// show all partners
router.get('/partners', function(req, res, next) {
  Users().select().then(function(results) {
    res.render('partners/index', {users: results});
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

module.exports = router;
