const Candidate = require('./Candidate')

Candidate.deleteMany({})
    .then(()=> {
        console.info('Dropped all candidates');
    })
    .catch((err) => console.error(err))