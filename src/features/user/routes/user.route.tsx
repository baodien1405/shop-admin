import { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RoutePath } from '@/features/shared/constants'
import { Spinner } from '@/features/shared/components'

const ActiveUser = lazy(() => import('@/features/user/pages/active-user'))
const TrashUser = lazy(() => import('@/features/user/pages/trash-user'))

export const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={[RoutePath.USERS, RoutePath.ACTIVE_USER].join('')} replace />
  },
  {
    path: RoutePath.ACTIVE_USER.slice(1),
    element: (
      <Suspense fallback={<Spinner />}>
        <ActiveUser />
      </Suspense>
    )
  },
  {
    path: RoutePath.TRASH_USER.slice(1),
    element: (
      <Suspense fallback={<Spinner />}>
        <TrashUser />
      </Suspense>
    )
  }
]
