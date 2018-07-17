const express = require('express')
const router = express.Router()
const Candidate = require('../candidates/Candidate')

router.post('/', (req, res) => {
    Candidate.find({
        $text: {
            $search: new RegExp(req.body.query)
        }
    })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            throw new Error(err.message)
        })
})

module.exports = router
