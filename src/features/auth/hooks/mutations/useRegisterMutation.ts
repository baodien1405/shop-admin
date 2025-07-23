import { useMutation } from '@tanstack/react-query'

import { AuthService } from '@/features/auth/services'

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: AuthService.register
  })
}
