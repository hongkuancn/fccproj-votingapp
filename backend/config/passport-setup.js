import passport from 'passport';
import googlePassport from 'passport-google-oauth20';
import User from '../models/user';

const GoogleStrategy = googlePassport.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: "669664652471-vq33uvis724vi2frpo3o7u3jv0qh0flm.apps.googleusercontent.com",
    clientSecret: "JzyEi5Jodcx8-3PXfckkzGoZ",
    callbackURL: "/api/twitter/callback"
  },(accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
      User.findOne({googleId: profile.id}).then((currentUser) => {
          if(currentUser){
              // already have this user
              console.log('user is: ', currentUser);
              done(null, currentUser);
          } else {
              // if not, create user in our db
              new User({
                  googleId: profile.id,
                  username: profile.displayName
              }).save().then((newUser) => {
                  console.log('created new user: ', newUser);
                  done(null, newUser);
              });
          }
      });
  }
))
