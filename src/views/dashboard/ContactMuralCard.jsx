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

const itemsPerPage = 3

const ContactMuralCard = ({ contacts }) => {
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

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
          {Array.from({ length: Math.ceil(contacts.length / itemsPerPage) }).map((_, index) => (
            <Tab key={index} label={`Página ${index + 1}`} />
          ))}
        </Tabs>
        <List>
          {contacts.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((contact, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt={contact.name} src={contact.imageUrl} />
              </ListItemAvatar>
              <ListItemText primary={contact.name} secondary={`${contact.position} - ${contact.email}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default ContactMuralCard
