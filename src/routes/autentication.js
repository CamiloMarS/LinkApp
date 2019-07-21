const express = require("express");
const router = express.Router();
const passport = require('passport');
const LOGGER = { info: console.log };

/** Show Form Singup **/
router.get('/signup', (req, resp) => {
     resp.render('auth/signup');
});

/** Send Data signup **/
router.post('/signup', passport.authenticate('local.signup', {
     successRedirect: '/profile',
     failureRedirect: '/signup',
     failureFlash: true
}));

router.get('/profile', (req, resp) => {
     resp.send('this is your profile');
});


module.exports = router;
