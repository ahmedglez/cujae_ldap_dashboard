import { toast } from 'react-toastify'

// Export helper functions
export function showToastSuccess(message) {
  toast.success(message)
}

export function showToastError(message) {
  toast.error(message)
}

export function showToastInfo(message) {
  toast.info(message)
}

export function showToastWarning(message) {
  toast.warning(message)
}
