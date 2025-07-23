import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrimeReactProvider } from 'primereact/api'

import App from './App.tsx'
import { ConfirmDialogConfig, ToastConfig } from '@/features/shared/components'

import '@/i18n/i18n'
import './styles/index.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ConfirmDialogConfig />
        <ToastConfig />
      </QueryClientProvider>
    </PrimeReactProvider>
  </React.StrictMode>
)
