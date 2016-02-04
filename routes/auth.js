var express = require('express');
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var router = express.Router();
var validate = require('../lib/validations');

function Users() {
   return knex('megausers');
}

router.get('/signin', function(req, res, next) {
  res.render('signin/signin');
});

router.post('/signin', function(req, res, next) {
  Users().where('username', req.body.username).first().then(function(result){
    bcrypt.compare(req.body.password, result.password, function(err, res2) {
      if(res2 === true) {
        res.cookie("current_user", req.body.username, {secure: true});
        res.redirect('/' + result.username + '/freebies');
      }
      else {
        res.render('signin/signin', {error: "Incorrect username or password"});
      }
    });
  });
});

router.get('/signout', function(req, res, next) {
  res.clearCookie('current_user')
  res.redirect('/freebies')
});

// ADD NEW PARTNER
// show signup page
router.get('/signup', function(req, res, next) {
  res.render('signin/signup');
});

// connect new user to database
router.post('/users', function (req, res, next) {
  Users().select().orderBy('id').then(function(result) {
    var testObj = {
      username: req.body.username
    };

    if(!validate.checkForDuplicateUsers(testObj, result, ["username"])) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          Users().insert({
            name: req.body.name,
            url: req.body.url,
            username:  req.body.username,
            password: hash
          }).then(function(result) {
            res.redirect('/signin');
          });
        });
      });
    }
    else
      res.render('signin/signup', {error: "Username already exists"});
  });
});

module.exports = router;
