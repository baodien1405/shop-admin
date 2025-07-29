import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ProductFiltersParamsType } from '@/features/product/models'
import { ListParams } from '@/features/shared/models'

export function usePublishedProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    const defaultParams = new ListParams()
    const keyword = searchParams.get('keyword') ?? ''
    const page = parseInt(searchParams.get('page') ?? '') || defaultParams.page
    const limit = parseInt(searchParams.get('limit') ?? '') || defaultParams.limit
    const sortBy = searchParams.get('sortBy') ?? ''
    const order = (searchParams.get('order') as ProductFiltersParamsType['order']) ?? ''

    return {
      keyword,
      page,
      limit,
      sortBy,
      order
    }
  }, [searchParams])

  const setFilters = useCallback(
    (newFilters: ProductFiltersParamsType) => {
      setSearchParams((params) => {
        Object.entries(newFilters).forEach(([key, value]) => {
          if ([undefined, null, ''].includes(value) || (Array.isArray(value) && value.length === 0)) {
            params.delete(key)
          } else {
            const newValue = Array.isArray(value) ? value.join('|') : String(value)
            params.set(key, newValue)
          }
        })
        return params
      })
    },
    [setSearchParams]
  )

  return {
    filters,
    setFilters
  }
}
