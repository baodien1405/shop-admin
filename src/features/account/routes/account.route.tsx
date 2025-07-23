import { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RoutePath } from '@/features/shared/constants'
import { Spinner } from '@/features/shared/components'

const TradingAccount = lazy(() => import('@/features/account/pages/trading-account'))
const UnverifiedAccount = lazy(() => import('@/features/account/pages/unverified-account'))

export const accountRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={[RoutePath.ACCOUNTS, RoutePath.TRADING_ACCOUNT].join('')} replace />
  },
  {
    path: RoutePath.TRADING_ACCOUNT.slice(1),
    element: (
      <Suspense fallback={<Spinner />}>
        <TradingAccount />
      </Suspense>
    )
  },
  {
    path: RoutePath.UNVERIFIED_ACCOUNT.slice(1),
    element: (
      <Suspense fallback={<Spinner />}>
        <UnverifiedAccount />
      </Suspense>
    )
  }
]
