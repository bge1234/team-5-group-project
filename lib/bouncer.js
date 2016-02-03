module.exports = {
    ruloggedin: function(req, res, next) {
      if (req.cookies.current_user){
        next();
      } else {
        res.redirect("/signin");
      }
    }
}
