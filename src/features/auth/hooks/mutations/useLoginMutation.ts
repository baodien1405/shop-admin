import { useMutation } from '@tanstack/react-query'

import { AuthService } from '@/features/auth/services'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: AuthService.login
  })
}
