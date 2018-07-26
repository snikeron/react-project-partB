import axios from './init'

export default {
    loginUser,
    logoutUser,
    fetchUserAccount,
}

async function loginUser(email, password) {
    await axios.post('/auth/login', {
        email, 
        password
    })
    return true
}

async function logoutUser() {
    await axios.delete('/auth/logout')
    return true
}

async function fetchUserAccount(token) {
    const response = await axios.get('/candidates')
    const user = response.data
    return user
}