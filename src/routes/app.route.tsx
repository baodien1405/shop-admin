import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import { NotFound } from '@/features/shared/components'
import { RoutePath } from '@/features/shared/constants'
import { AuthLayout, MainLayout } from '@/features/shared/layouts'
import { RejectedRoute, ProtectedRoute } from '@/routes'

import { userRoutes } from '@/features/user/routes'
import { authRoutes } from '@/features/auth/routes'
import { productRoutes } from '@/features/product/routes'
import { discountRoutes } from '@/features/discount/routes'

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
      path: RoutePath.USERS,
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: userRoutes
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
      path: RoutePath.DISCOUNTS,
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: discountRoutes
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
