import jwt_decode from 'jwt-decode'
import { getItem, saveItem } from './localStorageUtils'

const TOKEN_KEY = 'jwtToken'

export const saveToken = token => {
  saveItem(TOKEN_KEY, token)
}

export const getToken = () => {
  getItem(TOKEN_KEY)
}

export const decodeJWT = token => {
  const decodedToken = jwt_decode(jwtToken)
  return decodedToken
}

export const checkRoles = roles => {
  const jwtToken = localStorage.getItem(TOKEN_KEY)
  const decodedToken = jwt_decode(jwtToken)
  const userRoles = decodedToken.roles
  return userRoles.includes(roles)
}
