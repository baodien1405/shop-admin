import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'

interface NotificationIconProps {
  totalUnreadCount?: number
  onToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function NotificationIcon({ totalUnreadCount = 0, onToggle = () => {} }: NotificationIconProps) {
  return (
    <Button
      icon={PrimeIcons.BELL}
      outlined={totalUnreadCount === 0}
      size='small'
      className='!w-7 !h-7 p-overlay-badge overflow-visible'
      onClick={onToggle}
    >
      {totalUnreadCount > 0 && (
        <Badge
          value={totalUnreadCount > 9 ? '9+' : totalUnreadCount}
          severity='danger'
          className='flex justify-center items-center rounded-full !h-5 !w-5'
        />
      )}
    </Button>
  )
}
