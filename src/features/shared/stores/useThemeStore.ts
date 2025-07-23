import { create } from 'zustand'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as ThemeMode) || 'light',

  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    set({ theme })
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return { theme: newTheme }
    })
  }
}))
