import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://encode-backend.now.sh',
    withCredentials: true
})

export default instance