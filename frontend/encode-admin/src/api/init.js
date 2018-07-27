import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://encode-backend.now.sh',
    // baseURL: 'http://localhost:3000',
    withCredentials: true
})

export default instance