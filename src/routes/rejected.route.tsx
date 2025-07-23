import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/stores'

export function RejectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return !isAuthenticated ? <Outlet /> : <Navigate to='*' />
}
