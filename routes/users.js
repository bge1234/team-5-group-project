var express = require('express');
var router = express.Router();

// get specific user's freebies and maps page
router.get('/:id', function(req, res, next) {
  res.render('pages/user-freebies');
});

module.exports = router;
