import { useRef } from 'react'

import { OverlayPanel } from 'primereact/overlaypanel'
import { classNames } from 'primereact/utils'

import { NotificationHeader, NotificationIcon, NotificationItem } from '@/features/notification/components'

export default function Notification() {
  const overlayRef = useRef<OverlayPanel>(null)
  const notificationList = [
    {
      id: '1',
      title: 'New Product',
      content: 'New product added',
      severity: 'info',
      creationTime: '2023-10-01T12:00:00Z',
      readAt: null,
      downloadItems: [{ fileName: 'product-details.pdf', extension: '.pdf', url: '/downloads/product-details.pdf' }]
    },
    {
      id: '2',
      title: 'Order Shipped',
      content: 'Order shipped',
      severity: 'success',
      creationTime: '2023-10-02T14:00:00Z',
      readAt: null,
      downloadItems: []
    }
  ]

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
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </section>
      </OverlayPanel>
    </>
  )
}
