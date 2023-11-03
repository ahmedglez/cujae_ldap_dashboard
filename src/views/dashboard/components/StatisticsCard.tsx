import React from 'react'
import { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import SchoolIcon from 'mdi-material-ui/School'
import Settings from 'mdi-material-ui/light/Settings'
import { CustomFormatListBulletedIcon } from '@/icons/index'
import { ThemeColor } from 'src/@core/layouts/types'
import useProfileStore from '@/stores/profile.store'
import { decodeJWT } from '@/helpers/jwtUtils'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const createStatsData = (
  isAdmin: boolean,
  userType: string,
  userInformation: string,
  workArea: string,
  studentClassGroup: string,
  orgRole: string
) => {
  const decodedJWT = decodeJWT()
  const userData: DataType[] = [
    {
      stats: userType,
      title: 'Tipo de usuario',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: userType === 'Estudiante' ? userInformation : workArea,
      title: userType === 'Estudiante' ? 'Tipo de Curso' : 'Área de Trabajo',
      color: 'primary',
      icon:
        userType === 'Estudiante' ? (
          <SchoolIcon sx={{ fontSize: '1.75rem' }} />
        ) : (
          <TrendingUp sx={{ fontSize: '1.75rem' }} />
        )
    },
    {
      stats: decodedJWT.roles.includes('admin') ? 'Administrador' : 'Usuario',
      color: 'warning',
      title: 'Rol',
      icon: <Settings sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: userType === 'Estudiante' ? studentClassGroup : orgRole,
      color: 'info',
      title: userType === 'Estudiante' ? 'Grupo' : 'Categoría Educacional',
      icon: <CustomFormatListBulletedIcon sx={{ fontSize: '1.75rem' }} />
    }
  ]

  return userData
}

const renderStats = (statsData: DataType[]) => {
  return statsData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = (isAdmin: boolean = false) => {
  const { user, last_time_logged } = useProfileStore()

  const statsData = createStatsData(
    isAdmin,
    user.userType,
    user.userInformation,
    user.workArea,
    user.studentClassGroup,
    user.orgRole
  )

  return (
    <Card>
      <CardHeader
        title={'Estadísticas de usuario'}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Última vez activo: {new Date(last_time_logged).toLocaleString().split(',')[0]} a las{' '}
              {new Date(last_time_logged).toLocaleString().split(',')[1]}
            </Box>{' '}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(statsData)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
