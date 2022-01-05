module.exports = {
    userAuthenticatedComment: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in before submitting comments');
      req.session.returnTo = req.originalUrl;
      res.redirect('/users/login');
    },
    userAuthenticatedApplication: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in before applying for adoption');
      req.session.returnTo = req.originalUrl; 
      res.redirect('/users/login');
    },
    sellerAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        if(req.user.seller == true) {
          return next();
        }
      }
      req.flash('error_msg', 'Please login with a SELLER account in order to post adverts.');
      req.session.returnTo = req.originalUrl;
      res.redirect('/users/login');
    },
    adminAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        if(req.user.admin == true) {
          return next();
        }
      }
      req.flash('error_msg', 'Please login with an ADMIN account in order to delete or edit adverts.');
      req.session.returnTo = req.originalUrl;
      res.redirect('/users/login');
    }
  };