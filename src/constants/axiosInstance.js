import axios from 'axios'
require('dotenv').config()

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
