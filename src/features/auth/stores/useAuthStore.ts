import { create } from 'zustand'

import { User } from '@/features/auth/models'
import { getAccessTokenFromLS, getProfileFromLS } from '@/features/auth/utils'

interface AuthState {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  profile: User | null
  setProfile: (profile: User | null) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS(),

  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setProfile: (profile: User | null) => set({ profile }),
  reset: () => {
    set({
      isAuthenticated: false,
      profile: null
    })
  }
}))
