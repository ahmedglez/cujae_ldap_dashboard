// ** React Imports
import { ElementType, ReactNode, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'

import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ChevronUp from 'mdi-material-ui/ChevronUp'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { Settings } from 'src/@core/context/settingsContext'
import { NavGroupLink, NavLink, NavSectionTitle } from 'src/@core/layouts/types'

// ** Custom Components Imports
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

// ** Utils

interface Props {
  item: NavGroupLink
  settings: Settings
  navVisible?: boolean
  toggleNavVisibility: () => void
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavGroupLink = ({ item, navVisible, toggleNavVisibility }: Props) => {
  // ** Hooks
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const IconTag: ReactNode = isOpen ? <ChevronUp /> : <ChevronDown />

  const handleToogleOpen = () => {
    setIsOpen(prev => !prev)
  }

  const resolveNavItemComponent = (item: NavLink | NavSectionTitle | NavGroupLink) => {
    if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle
    if ((item as NavGroupLink).menuTitle) return VerticalNavGroupLink

    return VerticalNavLink
  }

  const renderMenuItems = item.childrens?.map((item: NavLink | NavSectionTitle | NavGroupLink, index: number) => {
    const TagName: any = resolveNavItemComponent(item)

    return <TagName key={index} item={item} />
  })

  return (
    <Box
      sx={{
        width: '100%',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ListItem disablePadding className='nav-link' sx={{ mt: 1.5, px: '0 !important' }}>
        <MenuNavLink
          component={'a'}
          onClick={handleToogleOpen}
          sx={{
            pl: 5.5,
            cursor: 'pointer'
          }}
        >
          <Typography mr={5} {...(themeConfig.menuTextTruncate && { noWrap: true })}>
            {item.menuTitle}
          </Typography>
          {IconTag}
        </MenuNavLink>
      </ListItem>
      {isOpen && <Box ml={6}>{renderMenuItems}</Box>}
    </Box>
  )
}

export default VerticalNavGroupLink
