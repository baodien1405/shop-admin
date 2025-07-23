import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ProductService } from '@/features/product/services'
import { ProductQueryKeys } from '@/features/product/constants'
import { ProductFiltersParamsType } from '@/features/product/models'

export const useDraftProductListQuery = (filters: ProductFiltersParamsType) => {
  const { i18n } = useTranslation()

  const { data, error, isError, ...restQuery } = useQuery({
    queryKey: [ProductQueryKeys.DRAFT_PRODUCT_LIST, filters, i18n.language],
    queryFn: () => ProductService.getAllDrafts(filters)
  })

  return {
    data: isError ? undefined : data,
    error,
    isError,
    ...restQuery
  }
}
