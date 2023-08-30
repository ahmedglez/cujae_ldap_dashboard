import jwt_decode from 'jwt-decode'

const TOKEN_KEY = 'jwtToken'

export const saveToken = token => {
  localStorage.saveItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const decodeJWT = () => {
  const jwtToken = localStorage.getItem(TOKEN_KEY)
  const decodedToken = jwt_decode(jwtToken)
  return decodedToken
}

export const checkRoles = roles => {
  const jwtToken = localStorage.getItem(TOKEN_KEY)
  const decodedToken = jwt_decode(jwtToken)
  const userRoles = decodedToken.roles
  return userRoles.includes(roles)
}

export const getLastTimeLogged = roles => {
  const jwtToken = localStorage.getItem(TOKEN_KEY)
  const decodedToken = jwt_decode(jwtToken)
  return decodedToken.last_time_logged
}
