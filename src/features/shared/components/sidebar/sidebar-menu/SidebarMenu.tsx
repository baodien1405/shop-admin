import { useState } from 'react'
import { PanelMenu } from 'primereact/panelmenu'

import { useMenu } from '@/features/shared/hooks'

export function SidebarMenu() {
  const menu = useMenu()
  const [expandedKeys, setExpandedKeys] = useState({})

  return (
    <PanelMenu
      className='sidebar-menu'
      model={menu}
      multiple
      expandedKeys={expandedKeys}
      onExpandedKeysChange={setExpandedKeys}
    />
  )
}
