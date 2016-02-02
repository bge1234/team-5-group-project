var express = require('express');
var router = express.Router();

// get specific user's freebies and maps page
router.get('/:id', function(req, res, next) {
  res.render('freebies/user-index');
});

module.exports = router;
