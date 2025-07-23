import { Divider } from 'primereact/divider'

import { SidebarMenu } from '@/features/shared/components/sidebar/sidebar-menu'
import { SidebarProfile } from '@/features/shared/components/sidebar/sidebar-profile'

export function SidebarExpanded() {
  return (
    <div className='flex flex-col h-full'>
      <Divider className='text-neutral-100 mt-2' />

      <SidebarMenu />

      <div className='mt-auto'>
        <Divider className='text-neutral-100' />

        <SidebarProfile />

        <Divider className='text-neutral-100' />

        <div className='text-neutral-600 text-base text-center'>Shop Admin - Version 2.0</div>
      </div>
    </div>
  )
}
