const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new FacebookStrategy({
    clientID: '1094885869357563',
    clientSecret: 'c8afd5b67a0111bec39d03bf77699320',
    callbackURL: 'http://localhost:8090/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;