import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showToastError, showToastWarning, showToastSuccess, showToastInfo } from '@/helpers/toastHelper'
import { getToken } from '@/helpers/jwtUtils'
const useTokenVerification = () => {
  const router = useRouter()

  // Establece el intervalo de verificación en milisegundos (por ejemplo, cada 10 minutos)
  const verificationInterval = 5 * 60 * 1000

  useEffect(() => {
    function verifyToken() {
      const token = getToken()
      if (token) {
        const tokenData = jwt_decode(token)

        /* avisar de que la sesion va expirar en tantos minutos */
        const expDate = new Date(tokenData.exp * 1000)
        const now = new Date()
        const diff = expDate - now
        const minutes = Math.floor(diff / 60000)
        if (minutes < 5) {
          showToastWarning(`Su sesión expira en ${minutes} minutos`)
        }

        if (tokenData && tokenData.exp * 1000 > Date.now()) {
          return // Token válido, no hagas nada
        }
      }
      showToastError('Su sesión ha expirado')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }

    // Ejecuta la verificación cuando se monta el componente y luego repítela cada X milisegundos
    verifyToken()
    const intervalId = setInterval(verifyToken, verificationInterval)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId)
  }, [router])

  return null
}

export default useTokenVerification
