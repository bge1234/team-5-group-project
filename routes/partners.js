var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();
var nodemailer = require('nodemailer');

function Users() {
   return knex('megausers');
}

function Freebies(){
 return knex('freebies');
};

// Show a Partner's Private home page
router.get('/:username', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(result){
    Freebies().where('creator_id', result.id).then(function(results){
      res.render('partners/show', {freebies: results, user: result});
    });
  });
});

// Partner's Private add freebies page
router.get('/new/:username/freebies', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(result){
    res.render('freebies/new', {user: result});
  });
});

// Partner's add freebies to db
router.post('/:username/freebies', function(req, res, next) {
  Freebies().insert(req.body).then(function(results) {
    res.redirect('/' + req.params.username + '/');
  });
});

// Partner's edit freebies
router.get('/:username/freebies/:id/edit', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(uresult){
    Freebies().where('id', req.params.id).first().then(function(fresult){
      res.render('freebies/edit', { freebie: fresult, user: uresult });
    });
  });
});

// Partner's update freebie in db
router.post('/:username/freebies/:id', function(req, res, next) {
  Freebies().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/' + req.params.username + '/');
  });
});

// Partner's delete freebie
router.get('/:username/freebies/:id/delete', function(req, res, next) {
  Freebies().where('id', req.params.id).del().then(function(results) {
    res.redirect('/' + req.params.username + '/');
  });
});


module.exports = router;
