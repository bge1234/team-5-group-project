var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Users() {
   return knex('megausers');
}

function Freebies(){
 return knex('freebies');
};

// get specific megauser's freebies page
router.get('/:username/freebies', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(result){
    Freebies().where('creator_id', result.id).then(function(results){
      res.render('index', {freebies: results, user: result});
    });
  });
});

// show add freebies page
router.get('/:username/freebies/new', function(req, res, next) {
  res.render('freebies/new');
});

// add freebies to db
router.post('/:username/freebies', function(req, res, next) {
  Freebies().insert(req.body).then(function(results) {
    res.redirect('/' + req.params.username + '/freebies');
  });
});

// edit freebies
router.get('/:username/freebies/:id/edit', function(req, res, next) {
  Users().where('user_name', req.params.username).first().then(function(uresult){
    Freebies().where('id', req.params.id).first().then(function(fresult){
      res.render('freebies/edit', { freebie: fresult, user: uresult });
    });
  });
});

// update freebie in db
router.post('/:username/freebies/:id', function(req, res, next) {
  Freebies().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/' + req.params.username + '/freebies');
  });
});

// delete freebie
router.get('/:username/freebies/:id/delete', function(req, res, next) {
  Freebies().where('id', req.params.id).del().then(function(results) {
    res.redirect('/' + req.params.username + '/freebies');
  });
});


module.exports = router;
