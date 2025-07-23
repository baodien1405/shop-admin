import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ProductService } from '@/features/product/services'
import { ProductQueryKeys } from '@/features/product/constants'

export const useEditProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ProductService.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.DRAFT_PRODUCT_LIST] })
    }
  })
}
