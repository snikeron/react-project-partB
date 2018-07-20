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
    const candidate = new Candidate(req.body)
    candidate.save()
        .then(() => {
            res.status(200).json(candidate)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

router.get('/candidates/:id', async(req, res) => {
    const id = req.params.id
    try {
        const candidate = await Candidate.find(id)
        res.status(200).json(candidate)
    } catch(err){
        res.status(500).json(err)
    }
})

// Update a single Candidate in the collection.
router.put('/candidates/:id',function(req, res){
    const id = req.params.id
    
    Candidate.findOneAndUpdate(id, req.body, {new: true}, function (err, candidate) {
        
        if(err){
            return res.send(err);
        } 
        console.log({message:"candidate updated"});
        res.status(200).json(candidate);
    
    });
});

module.exports = router

