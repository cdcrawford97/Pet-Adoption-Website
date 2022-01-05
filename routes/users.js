const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// GET registration page
router.get('/register', (req, res) => {
  res.status(200).render('register', { page_name: '', accountName: !req.user ? null : req.user.name });
});

// Register Handle
router.post('/register', (req, res) => {
  const {seller, name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if(!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' })
  }

  // Check passwords match
  if(password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  // Check password length
  if(password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      seller,
      name,
      email,
      password,
      password2,
      page_name: null,
      login_info: false,
      accountName: null
    });
  } else {
    //Validation passed
    User.findOne({ email: email })
      .then(user => {
        if(user) {
          //User exists
          errors.push({ msg: 'Email is already registered'});
          res.render('register', {
            errors,
            seller,
            name,
            email,
            password,
            password2,
            page_name: null,
            login_info: false,
            accountName: null
          });
        } else {
          const newUser = new User({
            seller,
            name,
            email,
            password
          });
          // Hash Password
          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save user
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
          }))
        }
      });
  }

});

// GET login page
router.get('/login', (req, res) => {
  res.status(200).render('login', { page_name: '', accountName: !req.user ? null : req.user.name });
});

// Login Handle
router.post('/login', (req, res, next) => {
  let returnTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  passport.authenticate('local', {
    successRedirect: returnTo,
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
