const useStyles = () => ({
  tableCell: {
    whiteSpace: 'nowrap', // Evita el salto de línea
    overflow: 'hidden', // Oculta el exceso de texto
    textOverflow: 'ellipsis', // Agrega puntos suspensivos si el texto es demasiado largo
    textAlign: 'center'
  }
})

export default useStyles
