import axios from 'axios'
import Router from 'next/router' // Importa la biblioteca de enrutamiento de Next.js
require('dotenv').config()
import { getToken } from '@/helpers/jwtUtils'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const withoutAuthAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const withAuthAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
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

// Agrega un interceptor de respuesta para manejar códigos de respuesta no autorizados (401)
withAuthAxiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Redirige a la página de login en caso de no autorización
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('profileStoreState')
      Router.push('/login')
    }
    return Promise.reject(error)
  }
)
