import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useAppRoute } from '@/routes/app.route'
import { useThemeStore } from '@/features/shared/stores'

export default function App() {
  const router = useAppRoute()
  const { theme } = useThemeStore()

  useEffect(() => {
    const body = document.body
    body.classList.remove('light-theme', 'dark-theme')
    body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme')
  }, [theme])

  return <RouterProvider router={router} />
}
