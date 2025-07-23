import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SidebarState {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      setIsCollapsed: (collapsed: boolean) => set({ isCollapsed: collapsed })
    }),
    {
      name: 'sidebarCollapsed',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
