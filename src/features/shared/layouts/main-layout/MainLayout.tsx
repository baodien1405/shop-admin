import { classNames } from 'primereact/utils'
import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from '@/features/shared/components'
import { useSidebarStore } from '@/features/shared/stores'

export function MainLayout() {
  const { isCollapsed } = useSidebarStore()

  return (
    <section className='flex'>
      <aside
        className={classNames({
          'w-[var(--sidebar-collapsed-width)]': isCollapsed,
          'w-[var(--sidebar-expanded-width)]': !isCollapsed
        })}
      >
        <Sidebar />
      </aside>

      <main
        className={classNames('bg-neutral-50 h-screen flex-1 px-4 py-6', {
          'w-[calc(100%-var(--sidebar-collapsed-width))]': isCollapsed,
          'w-[calc(100%-var(--sidebar-expanded-width))]': !isCollapsed
        })}
      >
        <div className='overflow-hidden rounded-xl border border-solid border-neutral-100 bg-neutral-0 h-full'>
          <Header />
          <Outlet />
        </div>
      </main>
    </section>
  )
}
