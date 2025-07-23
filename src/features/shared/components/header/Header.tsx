import { BreadCrumb, Notification, SwitchLanguage, ThemeToggle } from '@/features/shared/components'

export function Header() {
  return (
    <header className='h-[var(--header-height)] border-b border-neutral-100 px-4 py-3 flex items-center justify-between bg-neutral-25'>
      <BreadCrumb />

      <div className='flex items-center gap-2'>
        <Notification />
        <ThemeToggle />
        <SwitchLanguage />
      </div>
    </header>
  )
}
