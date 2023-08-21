import jwt_decode from 'jwt-decode'
import { getItem, saveItem } from './localStorageUtils'

const TOKEN_KEY = 'jwtToken'

export const saveToken = token => {
  saveItem(TOKEN_KEY, token)
}

export const getToken = () => {
  getItem(TOKEN_KEY)
}

export const decodeJWT = () => {
  const decodedToken = jwt_decode(jwtToken)
}
