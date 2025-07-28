import { useState } from 'react'

import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'

interface NotificationIconProps {
  onToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function NotificationIcon({ onToggle }: NotificationIconProps) {
  const [unreadCount] = useState(0)

  return (
    <Button
      icon={PrimeIcons.BELL}
      outlined={unreadCount === 0}
      size='small'
      className='!w-7 !h-7 p-overlay-badge overflow-visible'
      onClick={onToggle}
    >
      {unreadCount > 0 && (
        <Badge
          value={unreadCount > 9 ? '9+' : unreadCount}
          severity='danger'
          className='flex justify-center items-center rounded-full !h-5 !w-5'
        />
      )}
    </Button>
  )
}
