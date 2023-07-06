import { toast } from 'react-toastify'

export const showToast = (
  message: string,
  type: 'default' | 'error' = 'default'
) =>
  toast(message, {
    type,
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 2000,
  })
