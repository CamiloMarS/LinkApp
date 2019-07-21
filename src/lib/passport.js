const passport = require('passport');
const { Strategy } = require('passport-local');
const conn = require('../database');
const helpers = require('../lib/helpers');

// Objet configuration
passport.use('local.signup', new Strategy({
     usernameField: 'username',
     passwordField: 'password',
     passReqToCallback: true
}, async (req, username, password, done) => { //This a callback, is execute after strategy object configuration 
     const { fullname } = req.body;
     const newUser = {
          username,
          password: await helpers.encryptPassword(password),
          fullname
     };

     const result = await conn.query('INSERT INTO users SET ?', [newUser]); //save database 
     return done(null, { id: result.insertId, ...newUser });
}));

//Serializar el usuario 
passport.serializeUser((user, done) => {
     done(null, user.id);
});

//Deserializar 
passport.deserializeUser(async (id, done) => {
     const rows = await conn.query('SELECT * FROM users WHERE id =?', [id]);
     done(null, rows[0]);
});

module.exports = passport;