import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/stores'
import { RoutePath } from '@/features/shared/constants'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />
}
