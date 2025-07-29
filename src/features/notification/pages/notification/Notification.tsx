import { useRef } from 'react'

import { OverlayPanel } from 'primereact/overlaypanel'
import { classNames } from 'primereact/utils'

import { NotificationHeader, NotificationIcon, NotificationItem } from '@/features/notification/components'
import { useNotificationListQuery } from '@/features/notification/hooks'

export default function Notification() {
  const overlayRef = useRef<OverlayPanel>(null)
  const { data: notificationListData } = useNotificationListQuery()
  const notificationList = notificationListData?.data?.metadata || []

  return (
    <>
      <NotificationIcon onToggle={(event) => overlayRef.current?.toggle(event)} />

      <OverlayPanel
        ref={overlayRef}
        className='[&_.p-overlaypanel-content]:p-0 shadow-3xl w-[var(--notification-width)]'
      >
        <NotificationHeader onHide={() => overlayRef.current?.hide()} />

        <section
          className={classNames(
            'flex flex-col gap-3',
            'p-4 h-[calc(var(--notification-height)-var(--notification-header-height))]',
            'overflow-y-auto'
          )}
        >
          {notificationList.map((notification) => (
            <NotificationItem key={notification._id} notification={notification} />
          ))}
        </section>
      </OverlayPanel>
    </>
  )
}
