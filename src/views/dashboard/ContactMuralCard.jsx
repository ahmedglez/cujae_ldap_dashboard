import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import { areas, contacts } from '@/data/contacts'
import { Box } from '@mui/material'
const itemsPerPage = 3

const ContactMuralCard = () => {
  const [page, setPage] = useState(0)
  const [contactsByArea, setContactsByArea] = useState(contacts[0])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    const newContactsByArea = contacts.find(contact => contact.area === newPage)
    setContactsByArea(newContactsByArea)
  }

  console.log('page', page)

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Contactos Principales
        </Typography>
        <Tabs
          value={page}
          onChange={handleChangePage}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
        >
          {areas.map((area, index) => (
            <Tab
              key={index}
              label={area}
              value={area}
              id={`vertical-tab-${index}`}
              aria-controls={`vertical-tabpanel-${index}`}
            />
          ))}
        </Tabs>
        <List>
          {contactsByArea.contactos.map((contact, index) => (
            <ListItem
              key={index}
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                },
                display: 'flex',
                cursor: 'pointer',
                gap:'10px'
              }}
            >
              <ListItemAvatar>
                <Avatar alt={contact.name} src={contact.imageUrl} />
              </ListItemAvatar>
              <ListItemText primary={contact.name} secondary={contact.position} />
              <ListItemText primary={contact.email} secondary={contact.phones.join(', ')} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default ContactMuralCard
