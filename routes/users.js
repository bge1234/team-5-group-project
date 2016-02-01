var express = require('express');
var router = express.Router();

// get specific user's activities and maps page
router.get('/:id', function(req, res, next) {
  res.render('pages/user-activities');
});
console.log("stuff!");
module.exports = router;
