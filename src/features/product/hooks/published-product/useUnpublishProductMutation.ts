import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ProductService } from '@/features/product/services'
import { ProductQueryKeys } from '@/features/product/constants'

export const useUnpublishProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ProductService.unpublish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.PUBLISHED_PRODUCT_LIST] })
    }
  })
}
