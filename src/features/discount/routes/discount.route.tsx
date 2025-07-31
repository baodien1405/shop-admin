import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

import { Spinner } from '@/features/shared/components'

const Discounts = lazy(() => import('@/features/discount/pages/discounts'))

export const discountRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<Spinner />}>
        <Discounts />
      </Suspense>
    )
  }
]
