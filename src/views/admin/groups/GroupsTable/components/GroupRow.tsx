import StudentType from '@/types/student.type'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ChevronDownIcon from 'mdi-material-ui/ChevronDown'
import ChevronUpIcon from 'mdi-material-ui/ChevronUp'
import React, { Fragment, useState } from 'react'
import attributeMapping from '../data/attributeMapping'
import useStyles from '../styles'
import LDAPGroup from '@/types/ldapGroup'

interface GroupRowProps {
  group: LDAPGroup
  index: number
}

const GroupRow: React.FC<GroupRowProps> = ({ group, index }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='basic' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </TableCell>
        {attributeMapping.map(attribute => (
          <TableCell sx={classes.tableCell} key={attribute} size='small' align='center'>
            {group[attribute as keyof LDAPGroup]}
          </TableCell>
        ))}
      </TableRow>
    </Fragment>
  )
}

export default GroupRow
