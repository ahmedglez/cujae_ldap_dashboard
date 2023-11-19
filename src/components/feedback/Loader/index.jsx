import React from 'react'
import { Typography, CircularProgress } from '@mui/material'

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <CircularProgress size={60} thickness={4} color='primary' />
      <Typography variant='h5' style={{ marginTop: '1rem' }}>
        {message}
      </Typography>
    </div>
  )
}

export default Loader
