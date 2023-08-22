// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import logo from 'public/images/favicon.png'
import Image from 'next/image'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

const CardSigenu = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: theme => `${theme.spacing(15.75, 5, 12.25)} !important`
        }}
      >
        <Avatar
          sx={{ width: 80, height: 80, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <Image src={logo} alt='logo' layout='fill' />
        </Avatar>
        <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
          SIGENU
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 6 }}>
          Accede a SIGENU para visualizar información académica y calificaciones de estudiantes de forma rápida y
          sencilla.
        </Typography>
        <Button
          variant='contained'
          sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
          onClick={() => {
            window.open(
              'https://sigenu.cujae.edu.cu/josso/signon/login.do?josso_back_to=https://sigenu.cujae.edu.cu/sigenu-dss/josso_security_check&josso_partnerapp_id=sigenudss-partner',
              '_blank'
            )
          }}
        >
          Acceder a SIGENU
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardSigenu
