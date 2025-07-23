import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { OverlayPanel } from 'primereact/overlaypanel'
import { classNames } from 'primereact/utils'
import { confirmDialog } from 'primereact/confirmdialog'

import { useSidebarStore } from '@/features/shared/stores'
import { useLogoutMutation } from '@/features/auth/hooks'

export function SidebarProfile() {
  const { t } = useTranslation('shared')
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)
  const op = useRef<OverlayPanel>(null)
  const { mutate: mutateLogout } = useLogoutMutation()

  const handleSignOut = () => {
    confirmDialog({
      message: t('shared_sign_out_confirm_message'),
      header: t('shared_sign_out_confirm_header'),
      accept: mutateLogout
    })
  }

  return (
    <>
      <div
        className='px-4 py-3 rounded-md bg-neutral-50 flex items-center justify-between cursor-pointer'
        onClick={(event) => {
          op.current?.toggle(event)
        }}
      >
        <div className='flex items-center gap-2'>
          <div className='w-12 h-12 rounded-md flex items-center justify-center bg-neutral-25'>
            <i className='pi pi-user'></i>
          </div>

          {!isCollapsed && <h3 className='text-lg font-extrabold text-neutral-950 max-w-[184px] truncate'>Dien Cap</h3>}
        </div>

        <i className='pi pi-chevron-down text-neutral-950' />
      </div>

      <OverlayPanel ref={op}>
        <div
          className={classNames('text-neutral-950 text-sm', {
            'w-[var(--sidebar-collapsed-width)]': isCollapsed,
            'w-[var(--sidebar-expanded-width)]': !isCollapsed
          })}
        >
          <div
            className='py-3.5 px-2 rounded-md hover:bg-primary-25 hover:text-primary-500 transition-colors cursor-pointer'
            onClick={handleSignOut}
          >
            Đăng xuất
          </div>
        </div>
      </OverlayPanel>
    </>
  )
}
