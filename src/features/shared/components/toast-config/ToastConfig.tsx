import { useRef, useEffect } from 'react'
import { Toast } from 'primereact/toast'

import { ToastService } from '@/features/shared/services'

interface ToastConfigProps {
  position?: 'top-right' | 'center' | 'top-center' | 'top-left' | 'bottom-center' | 'bottom-left' | 'bottom-right'
}

export const ToastConfig = ({ position }: ToastConfigProps) => {
  const toastRef = useRef<Toast>(null)

  useEffect(() => {
    if (toastRef && toastRef.current) {
      ToastService.setToastRef(toastRef)
    }
  }, [])

  return <Toast ref={toastRef} position={position || 'top-right'} />
}
