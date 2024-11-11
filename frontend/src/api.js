import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// set base url to backend url when running for api calls
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// intercept all api calls from backend and get jwt access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api