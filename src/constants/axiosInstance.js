import axios from 'axios'
require('dotenv').config()
import { getToken } from '@/helpers/jwtUtils'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const withoutAuthAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const withAuthAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

withAuthAxiosInstance.interceptors.request.use(
  config => {
    const jwtToken = getToken()
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
