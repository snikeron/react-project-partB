const express = require('express');
const router = express.Router();
const User = require('../users/User');

const JWT_SECRET = process.env.JWT_SECRET

const JWT = require('jsonwebtoken');


router.post('/login', (req, res) => {
    const {email, password} = req.body
    User.loginAsAdmin(email, password)
    .then(user => {
        
        const payload = {
            email: user.email,
            admin: true
        }

        const token = JWT.sign(payload, JWT_SECRET)

        res.cookie('access_token', token, {
            // secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })

        res.status(200)
        res.json(user)
    })
    .catch(err => {
        res.status(400)
        throw new Error(err.message)
    })
})

router.delete('/logout', (req, res) => {
    res.clearCookie('access_token')
    res.status(200)
    res.json({message: 'logged out'})
})

module.exports = router;
