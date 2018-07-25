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
router.post('/salary', (req, res) => {
    Candidate.find({
        minSalary: { $gte: req.body.minSalary },
        
    })
        .then(results => {
            res.status(200).json(results)
        })
})

router.post('/test', (req, res) => {

    console.log(req.body)
    console.log(Object.keys(req.body).length)
    console.log(Object.keys(req.body))
    console.log(Object.values(req.body))
    console.log(Object.keys(req.body)[0])
    console.log(Object.values(req.body)[0])

    Candidate.find({
        minSalary: { $gte: req.body.minSalary },
        location: req.body.location,
     
    })
    .then(results => {
            res.status(200).json(results)
        })

    // switch(Object.keys(req.body).length) {
    //     case 0:
            
    //         break;
    //     case 1:
    //         console.log('case1')

    //         const key1 = Object.keys(req.body)[0]
    //         const value1 = Object.values(req.body)[0]

    //         console.log(key1, value1)

    //         Candidate.find({
    //             minSalary: req.body.minSalary,
    //         })
    //         .then(results => {
    //             res.status(200).json(results)
    //         })
            
    //         break;
    //     case 2: 

    //         Candidate.find({
    //             minSalary: { $gte: req.body.minSalary },
    //             location: req.body.location,
    //         })
    //         .then(results => {
    //             res.status(200).json(results)
    //         })

    //         break;
    //     case 3:

    //         break;
    //     case 4:

    //         break;
    //     default:            
    // }


    
})



module.exports = router
