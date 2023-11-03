import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useConfirmationDialogStore } from '@/stores/useConfirmationDialogStore'

const ConfirmDialog = () => {
  const { isOpen, message, title, type, confirmCB, cancelCB, closeDialog, handleConfirm } = useConfirmationDialogStore()

  const color = type === 'info' ? 'blue' : type === 'warning' ? 'yellow' : 'red'

  const dialogTitleStyle = {
    color: color
  }

  return (
    <Dialog onClose={closeDialog} open={isOpen}>
      {title && title !== '' && <DialogTitle sx={dialogTitleStyle}>{title}</DialogTitle>}
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => closeDialog(cancelCB)}>
          Cancelar
        </Button>
        <Button variant='contained' onClick={() => handleConfirm(confirmCB)}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
