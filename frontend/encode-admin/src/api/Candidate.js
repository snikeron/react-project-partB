import axios from './init'

export default {
    fetchCandidates,
    fetchOneCandidate,
    updateOneCandidate
}

// async function for login auth

async function fetchCandidates() {
    const {data:candidates} = await axios.get('/candidates')
    return candidates    
}

async function fetchOneCandidate(_id) {
    const {data:candidate} = await axios.get(`/candidates/${_id}`)
    return candidate
}

async function updateOneCandidate(_id, notes) {
    const {data:candidate} = await axios.put(`/candidates/${_id}`, notes)
    return candidate    
}



