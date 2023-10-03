// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { SvgIconProps } from '@mui/material'
import AccountGroup from 'mdi-material-ui/AccountGroup'
interface UserIconProps {
  iconProps?: SvgIconProps
  icon?: string | ReactNode
}

const UserIcon = (props: UserIconProps) => {
  // ** Props
  const { icon = AccountGroup, iconProps } = props
  const IconTag = icon

  let styles

  /* styles = {
    color: 'red',
    fontSize: '2rem'
  } */

  // @ts-ignore
  return <IconTag {...iconProps} style={{ ...styles }} />
}

export default UserIcon
