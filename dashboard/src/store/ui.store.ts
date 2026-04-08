import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  isDarkMode: boolean
  isSidebarOpen: boolean
  toggleDarkMode: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      isSidebarOpen: true,
      toggleDarkMode: () => {
        const next = !get().isDarkMode
        document.documentElement.classList.toggle('dark', next)
        set({ isDarkMode: next })
      },
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    }),
    {
      name: 'ui-store',
      onRehydrateStorage: () => (state) => {
        // Aplica dark mode al recargar la página
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)