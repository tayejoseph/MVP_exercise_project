import axios from 'axios'

const server = axios.create({
  baseURL: ' http://178.63.13.157:8090/mock-api/api',
  headers: { 'Content-Type': 'application/json' },
})

export default server
