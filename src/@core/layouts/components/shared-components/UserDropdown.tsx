// ** React Imports
import { Fragment, SyntheticEvent, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Custom Components
import ConfirmDialog from '@/components/feedback/ConfirmationDialog'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'

// ** Hooks
import { useConfirmationDialogStore } from '@/stores/useConfirmationDialogStore'

// ** Stores
import useProfileStore from '@/stores/profile.store'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const avatar = useProfileStore(state => state.avatar)
  const { user, roles } = useProfileStore()
  const { openDialog } = useConfirmationDialogStore()

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('profileStoreState')
    router.push('/login')
  }

  const handleLogoutClick = () => {
    console.log('click')
    openDialog('Estas seguro que deseas cerrar sesion', '', 'warning', handleLogout, () => {})
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <ConfirmDialog />
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar alt='Avatar' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} src={avatar} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='Avatar' src={avatar} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{user?.cn}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {roles[roles.length - 1]}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/account-settings')}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Perfil de usuario
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => window.open('https://correo.cujae.edu.cu/')}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Correo Cujae
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => window.open('https://soporte.cujae.edu.cu/front/helpdesk.faq.php')}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            Soporte
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleLogoutClick()}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
