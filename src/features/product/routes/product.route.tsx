import { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { Spinner } from '@/features/shared/components'
import { RoutePath } from '@/features/shared/constants'

const DraftProduct = lazy(() => import('@/features/product/pages/draft-product'))
const PublishedProduct = lazy(() => import('@/features/product/pages/published-product'))

export const productRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={[RoutePath.PRODUCTS, RoutePath.DRAFT].join('')} replace />
  },
  {
    path: RoutePath.DRAFT.slice(1),
    element: (
      <Suspense fallback={<Spinner />}>
        <DraftProduct />
      </Suspense>
    )
  },
  {
    path: RoutePath.PUBLISHED.slice(1),
    element: (
      <Suspense fallback={<Spinner />}>
        <PublishedProduct />
      </Suspense>
    )
  }
]
