const express = require('express');
const router = express.Router();
const User = require('../users/User');

const JWT_SECRET = process.env.JWT_SECRET

const JWT = require('jsonwebtoken');


router.post('/login', (req, res) => {
    const {email, password} = req.body
    User.loginAsAdmin(email, password)
    .then(user => {
        console.log('user', user)
        const payload = {
            email: user.email,
            admin: true
        }

        const token = JWT.sign(payload, JWT_SECRET)

        res.cookie('access_token', token, {
            secure: false,
            httpOnly: true,
            maxAge: 3600
        })

        res.status(200)
        res.json(user)
    })
    .catch(err => {
        res.status(400)
        res.json({err: err.message})
    })
})


module.exports = router;
