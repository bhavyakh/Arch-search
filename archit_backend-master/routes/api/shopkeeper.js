const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
/*
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
*/

// Load User model
const User = require('../../models/Shopkeepers');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
module.exports = router;

// @route   GET api/customer/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    //const { errors, isValid } = validateRegisterInput(req.body);
      errors = {}
      isValid= true
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Already exists';
        return res.status(400).json(errors);
      } else {
        
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          pincode: req.body.pincode,
          password: req.body.password,
          address: req.body.address
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            //if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  
  // @route   GET api/shopkeeper/login
  // @desc    Login User / Returning JWT Token
  // @access  Public
  router.post('/login', (req, res) => {
    //const { errors, isValid } = validateLoginInput(req.body);
      errors = {}
      isValid = true
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, pincode: user.pincode, what: user.what }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  });
  
  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        pincode: req.user.pincode,
        what: req.user.what
      });
    }
  );

  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        pincode: req.user.pincode,
        what: req.user.what
      });
    }
  );

  module.exports = router;