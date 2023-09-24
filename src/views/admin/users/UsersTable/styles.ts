import { useTheme } from '@mui/material'

const useStyles = () => {
  const theme = useTheme()
  return {
    tableCell: {
      whiteSpace: 'nowrap', // Evita el salto de línea
      overflow: 'hidden', // Oculta el exceso de texto
      textOverflow: 'ellipsis', // Agrega puntos suspensivos si el texto es demasiado largo
      textAlign: 'center'
    },
    filter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(2), // Adjust the padding as needed
      '& label': {
        marginRight: theme.spacing(1) // Adjust the spacing as needed
      },
      '& select': {
        minWidth: '150px' // Adjust the width as needed
      }
    }
  }
}

export default useStyles
