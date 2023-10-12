import LDAPGroup from '@/types/ldapGroup'
import { IconButton, TableCell, TableRow } from '@mui/material'
import ChevronDownIcon from 'mdi-material-ui/ChevronDown'
import ChevronUpIcon from 'mdi-material-ui/ChevronUp'
import React, { Fragment, useState } from 'react'
import attributeMapping from '../data/attributeMapping'
import useStyles from '../styles'

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
        <TableCell></TableCell>
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
