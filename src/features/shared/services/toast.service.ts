import { RefObject } from 'react'
import { ToastMessage } from 'primereact/toast'
import { Toast } from 'primereact/toast'

const TOAST_DEFAULT_LIFE = Number(import.meta.env.VITE_TOAST_DEFAULT_LIFE) || 4000

class ToastService {
  private toastRef: RefObject<Toast | null> | null = null

  setToastRef(ref: RefObject<Toast | null>) {
    this.toastRef = ref
  }

  private show(message: ToastMessage) {
    if (this.toastRef?.current) {
      this.toastRef.current.show(message)
    }
  }

  success({ summary, detail, life = TOAST_DEFAULT_LIFE }: ToastMessage) {
    this.show({ severity: 'success', summary, detail, life })
  }

  error({ summary, detail, life = TOAST_DEFAULT_LIFE }: ToastMessage) {
    this.show({ severity: 'error', summary, detail, life })
  }

  info({ summary, detail, life = TOAST_DEFAULT_LIFE }: ToastMessage) {
    this.show({ severity: 'info', summary, detail, life })
  }

  warn({ summary, detail, life = TOAST_DEFAULT_LIFE }: ToastMessage) {
    this.show({ severity: 'warn', summary, detail, life })
  }
}

const toastServiceInstance = new ToastService()

export default toastServiceInstance
