var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
// var apiKey = process.env.MEETUP_API_KEY;
var unirest = require('unirest');

function Freebies(){
 return knex('freebies');
};

function Users(){
 return knex('megausers');
};

function Categories(){
 return knex('categories');
};

// home + freebies all
router.get('/freebies', function(req, res, next) {
  Freebies().select().then(function(results) {
    unirest.get('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=us&city=denver&state=co&text=free&category=1,18,4,5,6,8,9,11,14,15,17,20,21&radius=15&status=upcoming&key=' + '3f7d255365182d12465e396b6267182e')
     .end(function(response) {
       var meetups = response.body.results;
        res.render('freebies/index', {freebies: results, events: meetups, lat: 39.757785, lng: -105.007142});
    });
  });
});



module.exports = router;
