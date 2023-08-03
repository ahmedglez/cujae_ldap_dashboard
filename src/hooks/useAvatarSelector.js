import { useState, useEffect } from 'react'
import useProfileStore from '@/stores/profile.store'

const avatars = {
  M: {
    Blanco: '/public/images/avatars/3.png',
    Negro: '/public/images/avatars/7.png'
    // Add more male avatar URLs for different skin colors if needed
  },
  F: {
    Blanco: '/public/images/avatars/8.png',
    Negro: '/public/images/avatars/4.png'
    // Add more female avatar URLs for different skin colors if needed
  }
}

const useAvatarSelector = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const user = useProfileStore(state => state.user)
  const { skinColor, sex } = user

  useEffect(() => {
    // Select the appropriate avatar based on skinColor and sex
    const avatarUrl = avatars[sex][skinColor] || '/public/images/avatars/1.png'
    setSelectedAvatar(avatarUrl)
  }, [skinColor, sex])

  return selectedAvatar
}

export default useAvatarSelector
