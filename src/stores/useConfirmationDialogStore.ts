import { create } from 'zustand'

type ConfirmationDialogType = 'info' | 'warning' | 'error'

interface ConfirmationDialogStore {
  isOpen: boolean
  message: string
  title: string
  type: ConfirmationDialogType
  openDialog: (
    message: string,
    title: string,
    type: ConfirmationDialogType,
    onConfirm: () => void,
    onCancel: () => void
  ) => void
  closeDialog: (cb: () => {}) => void
  handleConfirm: (cb: () => {}) => void
  confirmCB: () => void
  cancelCB: () => void
}

export const useConfirmationDialogStore = create<ConfirmationDialogStore>(set => ({
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  confirmCB: () => {},
  cancelCB: () => {},

  openDialog: (message, title, type, onConfirm: () => void, onCancel: () => void) => {
    set(() => ({ isOpen: true, message, title, type, confirmCB: onConfirm, cancelCB: onCancel }))
  },
  closeDialog: (cb: () => {}) => {
    set(() => ({ isOpen: false, message: '', title: '' }))
    cb()
  },
  handleConfirm: (cb: () => {}) => {
    set(() => ({ isOpen: false, message: '', title: '' }))
    cb()
  }
}))
