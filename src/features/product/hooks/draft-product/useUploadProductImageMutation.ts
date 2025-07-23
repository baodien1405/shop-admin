import { useMutation } from '@tanstack/react-query'

import { ProductService } from '@/features/product/services'

export const useUploadProductImageMutation = () => {
  return useMutation({
    mutationFn: ProductService.uploadImage
  })
}
