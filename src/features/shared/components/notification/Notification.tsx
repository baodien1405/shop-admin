import { useState } from 'react'

import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'

export function Notification() {
  const [unreadCount] = useState(0)

  return (
    <Button
      icon={PrimeIcons.BELL}
      outlined={unreadCount === 0}
      size='small'
      className='!w-7 !h-7 p-overlay-badge overflow-visible'
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
