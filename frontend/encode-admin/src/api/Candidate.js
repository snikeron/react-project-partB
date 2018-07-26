import axios from './init'

export default {
    fetchCandidates,
    fetchOneCandidate,
    updateOneCandidate,
    fetchSearchedCandidates,
    fetchSearchedCandidatesByLocation,
    fetchSearchedCandidatesByTech
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

async function fetchSearchedCandidates(query) {
    console.log(query)
    const {data:candidates} = await axios.post('/search', query)
    return candidates
}

async function fetchSearchedCandidatesByLocation(location) {
    console.log(location)
    const {data:candidates} = await axios.post('/search/location', location)
    return candidates
}

async function fetchSearchedCandidatesByTech(techStack) {
    console.log(techStack)
    const {data:candidates} = await axios.post('/search/tech', techStack)
    return candidates
}
