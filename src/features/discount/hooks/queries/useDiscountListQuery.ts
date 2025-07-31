import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { DiscountService } from '@/features/discount/services'
import { DiscountQueryKeys } from '@/features/discount/constants'
import { DiscountFiltersParamsType } from '@/features/discount/models'

export const useDiscountListQuery = (filters: DiscountFiltersParamsType) => {
  const { i18n } = useTranslation()

  const { data, error, isError, ...restQuery } = useQuery({
    queryKey: [DiscountQueryKeys.DISCOUNT_LIST, i18n.language, filters],
    queryFn: () => DiscountService.getAll(filters)
  })

  return {
    data: isError ? undefined : data,
    error,
    isError,
    ...restQuery
  }
}
