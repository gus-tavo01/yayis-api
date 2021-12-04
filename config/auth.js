const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/User');

module.exports = () => {
  const options = {
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
    // check if token belongs to an existing user
    UserModel.findById(jwt_payload.sub)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, null, 'Error getting the user data');
        }
      })
      .catch((err) => {
        return done(err, null);
      });
  });
  passport.use(jwtStrategy);
};
