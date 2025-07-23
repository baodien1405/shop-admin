import { NavLink, useLocation } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { classNames } from 'primereact/utils'

import { useMenu } from '@/features/shared/hooks'
import { SidebarProfile } from '@/features/shared/components/sidebar/sidebar-profile'

export function SidebarCollapsed() {
  const location = useLocation()
  const menu = useMenu()

  return (
    <div className='flex flex-col h-full'>
      <div>
        <Divider className='text-neutral-100 mt-2' />

        <div className='flex flex-col gap-4'>
          {menu.map((item) => {
            const isActive = location.pathname.startsWith(item.href)

            return (
              <NavLink
                to={item.href}
                key={item.href}
                className='text-center flex flex-col items-center justify-center gap-1'
              >
                <div
                  className={classNames('w-6 h-6 rounded-md p-1', {
                    'bg-primary-25 text-primary-500': isActive
                  })}
                >
                  <i className={item.icon} />
                </div>

                <h3
                  className={classNames('text-xs text-neutral-950', {
                    'text-primary-500 font-semibold': isActive
                  })}
                >
                  {item.label}
                </h3>
              </NavLink>
            )
          })}
        </div>
      </div>

      <div className='mt-auto'>
        <Divider className='text-neutral-100' />

        <SidebarProfile />

        <Divider className='text-neutral-100' />

        <div className='text-neutral-600 text-xs text-center'>Shop Admin - Version 2.0</div>
      </div>
    </div>
  )
}
