import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showToastInfo, showToastSuccess } from '@/helpers/toastHelper'
import useProfileStore from '@/stores/profile.store'

const LogoutPage = () => {
  const router = useRouter()
  const { logout } = useProfileStore()

  useEffect(() => {
    logout()
    showToastSuccess('¡Has cerrado sesión con éxito! Gracias por usar nuestra plataforma. ¡Hasta la próxima!')
    router.push('/login')
  }, [router])

  return <></>
}

export default LogoutPage
