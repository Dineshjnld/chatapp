const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return done(null, false, { message: 'Email is already registered' });
            }

            const newUser = new User({
                email,
                password: await bcrypt.hash(password, 10)
            });

            await newUser.save();

            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
