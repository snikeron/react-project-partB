const express = require('express')
const router = express.Router()
const Candidate = require('./Candidate')

router.get('/', (req, res) => {

    Candidate.find()
        .then(candidates => {
            res.status(200).json(candidates)
        })
        .catch(err => {
            throw new Error(err.message)
        })
})

router.post('/', (req, res) => {
    const candidate = new Candidate(req.body)
    candidate.save()
        .then(() => {
            res.status(200).json(candidate)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

module.exports = router
