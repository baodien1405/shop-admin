import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'

interface NotificationItemProps {
  notification: {
    id: string
    title: string
    content: string
    severity: string
    creationTime: string
    readAt?: string | null
    downloadItems?: { fileName: string; extension: string; url: string }[]
  }
}

enum NotificationSeverityEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SECONDARY = 'secondary',
  CONTRAST = 'contrast'
}

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div
      className={classNames('px-4 py-3 rounded-md hover:bg-neutral-100 hover:transition-colors', {
        'bg-neutral-50 cursor-pointer': !notification.readAt
      })}
      onClick={() => {}}
    >
      <div className='flex items-baseline gap-2'>
        <div
          className={classNames('w-5 h-5 rounded-full flex items-center justify-center', {
            'bg-green-700': notification.severity === NotificationSeverityEnum.SUCCESS,
            'bg-red-600': notification.severity === NotificationSeverityEnum.ERROR,
            'bg-blue-500': notification.severity === NotificationSeverityEnum.INFO,
            'bg-yellow-700': notification.severity === NotificationSeverityEnum.WARN
          })}
        >
          <i
            className={classNames('pi text-xs text-neutral-0', {
              'pi-check': notification.severity === NotificationSeverityEnum.SUCCESS,
              'pi-times': notification.severity === NotificationSeverityEnum.ERROR,
              'pi-info': notification.severity === NotificationSeverityEnum.INFO,
              'pi-exclamation-triangle': notification.severity === NotificationSeverityEnum.WARN
            })}
          />
        </div>

        <div className='flex-1'>
          <div className='flex flex-row justify-between items-center'>
            <h4 className='text-base font-semibold break-words overflow-auto mr-3'>{notification.title}</h4>

            {!notification.readAt && <Badge className='!bg-blue-500 !min-w-2 !h-2 cursor-pointer' />}
          </div>

          <div className='max-w-[310px] text-sm mt-1 break-words overflow-auto'>{notification.content}</div>

          <div className='flex items-center gap-2 mt-2'>
            {notification.downloadItems?.map((item) => (
              <Button
                key={item.fileName}
                label={item.extension}
                className='h-7 w-20 text-xs'
                type='button'
                size='small'
                severity='secondary'
                icon={PrimeIcons.DOWNLOAD}
              />
            ))}
          </div>

          <p className='text-neutral-600 mt-3 text-xs'>28/07/2025 - 17:48:20</p>
        </div>
      </div>
    </div>
  )
}
