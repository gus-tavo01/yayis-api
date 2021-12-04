const passport = require('passport');

module.exports = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user, infoErr) => {
    if (err) return res.InternalServerError(err);

    if (infoErr) return res.Unauthorized(infoErr.message);

    if (!user)
      return res.Unauthorized('Not authorized to perform this request');

    req.user = user;
    return next();
  })(req, res, next);
