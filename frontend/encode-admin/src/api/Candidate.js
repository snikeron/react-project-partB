import axios from './init'

export default {
    fetchCandidates,
    fetchOneCandidate,
    fetchSearchedCandidates
}

async function fetchCandidates() {
    const {data:candidates} = await axios.get('/candidates')
    return candidates    
}

async function fetchOneCandidate(_id) {
    const {data:candidate} = await axios.get(`/candidates/${_id}`)
    return candidate
}

async function fetchSearchedCandidates(query) {
    console.log(query)
    const {data:candidates} = await axios.post('/search', query)
    return candidates
}




