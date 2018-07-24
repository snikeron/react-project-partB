import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/',//'https://backend-izuntatfte.now.sh/', 
    /*
    Our backend is not allowing the 'localhost:3001 front end access
    Please fix the backend to have cors whitelist localhost:3001 OR actual front end URL
    Please ensure the whitelist is an environment variable
    */
    withCredentials: true
})

export default instance