import axios from "axios";


const apiClient = axios.create({
    baseURL: 'https://64ada5b2b470006a5ec63b39.mockapi.io' // TODO put this into .env
})

export default apiClient