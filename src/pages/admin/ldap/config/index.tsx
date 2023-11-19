import React from 'react'
import AdminRoute from '@/components/hocs/AdminRoute'
import useProfileStore from '@/stores/profile.store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import ObjectClass from '@/types/objectClass.type'
import { showToastError, showToastSuccess, showToastInfo, showToastWarning } from '@/helpers/toastHelper'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Loader from '@/components/feedback/Loader'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

interface Config {
  api: {
    version: string
    url: string
  }
  server: {
    port: string
  }
  mongodb: {
    url: string
  }
  ldap: {
    dn: string
    url: string
    base: string
    objectClasses: ObjectClass[]
    port: string
    sizeLimit: number
    timeLimit: number
  }
  redis: {
    url: string
  }
}
const CONFIG_URL = '/ldap/config'

const ConfigPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [config, setConfig] = useState<Config | null>(null)
  const { base, roles } = useProfileStore()

  const renderObjectClasses = (config: Config) => {
    if (!config.ldap.objectClasses) return null

    return (
      <div>
        <Typography variant='h5'>LDAP ObjectClasses:</Typography>
        <List>
          {config.ldap.objectClasses.map((objClass: ObjectClass) => (
            <ListItem key={objClass.name}>
              <ListItemText primary={objClass.name} secondary={objClass.description} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await withAuthAxiosInstance.get(CONFIG_URL)
      const { data } = response
      setConfig(data.config)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      showToastError('Lo sentimos, ha ocurrido un error inesperado')
      router.push('/')
    }
  }

  useEffect(() => {
    if (!roles.includes('admin')) {
      router.push('/')
    } else {
      fetchData()
    }
  }, [])

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant='h4' mb={4}>{`Configuración del Sistema`}</Typography>
      <Divider />
      {loading && <Loader message='Cargando configuración...' />}
      {!loading && config !== null && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '10px' }}>
          <Typography variant='h5' mt={2}>
            Configuración del Servidor:
          </Typography>
          <Typography variant='body1'>{`API Version: ${config.api.version}`}</Typography>
          <Typography variant='body1'>{`API URL: ${config.api.url}`}</Typography>
          <Typography variant='body1'>{`Server Port: ${config.server.port}`}</Typography>
          <Typography variant='body1'>{`MongoDB URL: ${config.mongodb.url}`}</Typography>
          <Typography variant='body1'>{`Redis URL: ${config.redis.url}`}</Typography>
          <Divider />
          <Typography variant='h5'>{`Configuración LDAP`}</Typography>
          <Typography variant='body1'>{`DN: ${config.ldap.dn}`}</Typography>
          <Typography variant='body1'>{`URL: ${config.ldap.url}`}</Typography>
          <Typography variant='body1'>{`Base: ${config.ldap.base}`}</Typography>
          <Typography variant='body1'>{`Port: ${config.ldap.port}`}</Typography>
          <Typography variant='body1'>{`Size Limit: ${config.ldap.sizeLimit}`}</Typography>
          <Typography variant='body1'>{`Time Limit: ${config.ldap.timeLimit}`}</Typography>
          <Divider />

          {renderObjectClasses(config)}
        </Box>
      )}
    </Paper>
  )
}

export default AdminRoute(ConfigPage)
