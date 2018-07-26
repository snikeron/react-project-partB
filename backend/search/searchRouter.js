const express = require('express')
const router = express.Router()
const Candidate = require('../candidates/Candidate')

router.post('/', (req, res) => {
    console.log('########### POST /search hit ###########')
    console.log(req.body)
    Candidate.find({
        $text: {
            $search: new RegExp(req.body.keyword)
        }
    })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            throw new Error(err.message)
        })
})

//// Find Model
router.post('/tech', (req, res) => {
    Candidate.find({
        techStack: {
            $all: req.body.techStack
        }
        
    })
        .then(results => {
            res.status(200).json(results)
        })
})

router.post('/location', (req, res) => {
    Candidate.find({
        location: req.body.location 
    })
        .then(results => {
            res.status(200).json(results)
        })
})



module.exports = router
