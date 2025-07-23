import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import { authRoutes } from '@/features/auth/routes'
import { NotFound } from '@/features/shared/components'
import { RoutePath } from '@/features/shared/constants'
import { AuthLayout, MainLayout } from '@/features/shared/layouts'
import { RejectedRoute, ProtectedRoute } from '@/routes'
import { accountRoutes } from '@/features/account/routes'
import { productRoutes } from '@/features/product/routes'

export function useAppRoute() {
  const routes: RouteObject[] = [
    {
      path: RoutePath.HOME,
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={[RoutePath.PRODUCTS, RoutePath.DRAFT].join('')} replace />
        },
        {
          element: <RejectedRoute />,
          children: authRoutes
        }
      ]
    },
    {
      path: RoutePath.ACCOUNTS,
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: accountRoutes
        }
      ]
    },
    {
      path: RoutePath.PRODUCTS,
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: productRoutes
        }
      ]
    },
    {
      path: RoutePath.STAFF,
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: []
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to={RoutePath.NOT_FOUND} />
    },
    {
      path: RoutePath.NOT_FOUND,
      element: <NotFound />
    }
  ]

  return createBrowserRouter(routes)
}
