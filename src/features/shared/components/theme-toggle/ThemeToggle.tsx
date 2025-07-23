import { Button } from 'primereact/button'

import { PrimeIcons } from 'primereact/api'

import { useThemeStore } from '@/features/shared/stores'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button
      outlined={theme === 'light'}
      size='small'
      icon={theme === 'light' ? PrimeIcons.SUN : PrimeIcons.MOON}
      className='!w-7 !h-7 p-overlay-badge overflow-visible'
      onClick={toggleTheme}
    />
  )
}
