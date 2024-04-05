const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.send(req.user);
});

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
