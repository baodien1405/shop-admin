import { Logo } from '@/features/shared/components'

interface SidebarHeaderProps {
  isCollapsed?: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

export function SidebarHeader({ isCollapsed, setIsCollapsed }: SidebarHeaderProps) {
  if (isCollapsed) {
    return (
      <div className='flex items-center justify-between w-full'>
        <Logo imgClass='w-10' textClass='hidden' />
        <i className='pi pi-table text-primary-500 cursor-pointer text-base' onClick={() => setIsCollapsed(false)} />
      </div>
    )
  }

  return (
    <div className='flex items-center justify-between gap-3 w-full'>
      <Logo imgClass='w-10' textClass='text-2xl font-extrabold' />

      <i className='pi pi-table text-primary-500 cursor-pointer text-xs' onClick={() => setIsCollapsed(true)} />
    </div>
  )
}
