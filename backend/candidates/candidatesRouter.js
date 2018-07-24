const express = require('express')
const router = express.Router()
const Candidate = require('./Candidate')

router.get('/', (req, res) => {
    Candidate.find()
        .then(candidates => {
            console.log(candidates)
            res.status(200).json(candidates)
        })
        .catch(err => {
            throw new Error(err.message)
        })
})

router.post('/', (req, res) => {
    // Modify priority into array of Strings only
    const candidateData = Object.assign({}, req.body)
    console.log(candidateData)
    candidateData.priority = []
    req.body.priority.forEach(item => {
        candidateData.priority.push(item.content)
    })

    const candidate = new Candidate(candidateData)

    candidate.save()
        .then(() => {
            res.status(200).json(candidate)
            console.log('Saved New Candidate')
            console.log(candidate)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
            console.error('Candidate Save Failure: ' + err)
        })
})

router.put('/:id', (req, res, next) => {
    Candidate.findByIdAndUpdate(req.params.id, req.body, function (err, candidate) {
        candidate.save()
            .then(() => {
                res.status(200).json(candidate)
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    })
})

router.get('/:id', (req, res, next) => {
    console.log(req.params.id)
    
    Candidate.findById(req.params.id, (err, candidate) => {
        if (err) return next(err);
        res.json(candidate);
    })
})



module.exports = router
