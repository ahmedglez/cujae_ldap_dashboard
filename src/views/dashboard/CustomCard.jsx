// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Image from 'next/image'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

const CustomCard = ({ title, description, image, link, cta }) => {
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
          <Image src={image} alt='logo' layout='fill' />
        </Avatar>
        <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 6 }}>
          {description}
        </Typography>
        <Button
          variant='contained'
          sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
          onClick={() => {
            window.open(link, '_blank')
          }}
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  )
}

export default CustomCard
