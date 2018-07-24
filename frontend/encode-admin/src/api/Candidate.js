import axios from './init'

export default {
    fetchCandidates,
    fetchOneCandidate
}

async function fetchCandidates() {
    const {data:candidates} = await axios.get('/candidates')
    return candidates    
}

async function fetchOneCandidate(_id) {
    const {data:candidate} = await axios.get(`/candidates/${_id}`)
    return candidate
}




