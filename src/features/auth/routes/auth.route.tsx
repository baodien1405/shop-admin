import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

import { RoutePath } from '@/features/shared/constants'
import { Spinner } from '@/features/shared/components'

const Login = lazy(() => import('@/features/auth/pages/login'))
const Register = lazy(() => import('@/features/auth/pages/register'))

export const authRoutes: RouteObject[] = [
  {
    path: RoutePath.LOGIN,
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    )
  },
  {
    path: RoutePath.REGISTER,
    element: (
      <Suspense fallback={<Spinner />}>
        <Register />
      </Suspense>
    )
  }
]
