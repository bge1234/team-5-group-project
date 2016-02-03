var express = require('express');
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var router = express.Router();
var validate = require('../lib/validations');

function Users() {
   return knex('megausers');
}

router.get('/signin', function(req, res, next) {
  res.render('megausers/signin');
});

router.post('/signin', function(req, res, next) {
  Users().where('username', req.body.username).first().then(function(result){
    if(!bcrypt.compare(req.body.password, result.password)){
      res.cookie('current_user', result.id);
      // res.redirect('/' + result.username + '/freebies');
      res.redirect('/freebies');
    } else {
      console.log("error - passwords don't match");
      res.render('megausers/signin');
    }
  });
});

router.get('/signout', function(req, res, next) {
  res.clearCookie('current_user')
  res.redirect('/freebies')
});

// ADD NEW MEGAUSER
// show page
router.get('/signup', function(req, res, next) {
  res.render('megausers/signup');
});
// connect new user to database
router.post('/users', function(req, res, next) {
  bcrypt.hash(req.body.password, 8, function(err, hash) {
    Users().insert(req.body).then(function(result){
      res.redirect('/signin');
    });
  });
});


module.exports = router;
