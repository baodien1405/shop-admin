import { Sidebar as PrimeSidebar } from 'primereact/sidebar'
import { classNames } from 'primereact/utils'

import { SidebarCollapsed } from '@/features/shared/components/sidebar/sidebar-collapsed'
import { SidebarExpanded } from '@/features/shared/components/sidebar/sidebar-expanded'
import { SidebarHeader } from '@/features/shared/components/sidebar/sidebar-header'
import { useSidebarStore } from '@/features/shared/stores'

export function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebarStore()

  return (
    <PrimeSidebar
      visible
      onHide={() => {}}
      dismissable={false}
      showCloseIcon={false}
      modal={false}
      className={classNames('transition-all', {
        'w-[var(--sidebar-collapsed-width)]': isCollapsed,
        'w-[var(--sidebar-expanded-width)]': !isCollapsed
      })}
      header={<SidebarHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
    >
      {isCollapsed ? <SidebarCollapsed /> : <SidebarExpanded />}
    </PrimeSidebar>
  )
}
