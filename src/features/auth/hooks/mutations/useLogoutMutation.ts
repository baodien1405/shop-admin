import { useMutation } from '@tanstack/react-query'

import { AuthService } from '@/features/auth/services'
import { useAuthStore } from '@/features/auth/stores'

export const useLogoutMutation = () => {
  const reset = useAuthStore((state) => state.reset)

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: reset
  })
}
