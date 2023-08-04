// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import useProfileStore from '@/stores/profile.store'
import { useRouter } from 'next/router'
import { useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute',
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  fiter: 'blur(4px)'
})

const WelcomeCard = () => {
  // ** Hook
  const theme = useTheme()
  const user = useProfileStore(state => state.user)
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  console.log('user', user)

  const handleClick = () => {
    router.push('account-settings/')
  }
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>{`Bienvenido ${user?.cn}!`}</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`Visita tu perfil para ver tus datos y cambiar tu contraseña.`}
        </Typography>
        <Button size='small' variant='contained' style={{ marginTop: 16 }} onClick={handleClick}>
          Ver perfil
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        {!isMobile && <TrophyImg alt='trophy' src='/images/misc/hello.png' />}
      </CardContent>
    </Card>
  )
}

export default WelcomeCard