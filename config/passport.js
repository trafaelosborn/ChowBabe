const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use(
    new LocalStrategy(
        // Specify username field and auth callback
        {usernameField: "email"},(email, password, done) => {
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'User does not exist.' });
                }
                // now compare the password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) {
                        return done(null, false, { message: 'Bad password. Try again.' });
                    } else {
                        return done(null, user);
                    }
                })
            });
        }
    )
)

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;