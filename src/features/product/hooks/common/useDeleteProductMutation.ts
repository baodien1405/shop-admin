import { useMutation } from '@tanstack/react-query'

import { ProductService } from '@/features/product/services'

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: ProductService.delete
  })
}
