import dayjs from 'dayjs'

import { Badge } from 'primereact/badge'
import { classNames } from 'primereact/utils'

import { NotificationInterface } from '@/features/notification/models'
import { NotificationTypesEnum } from '@/features/notification/enums'

interface NotificationItemProps {
  notification: NotificationInterface
}

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div
      className={classNames('px-4 py-3 rounded-md hover:bg-neutral-100 hover:transition-colors', {
        'bg-neutral-50 cursor-pointer': !notification.isRead
      })}
      onClick={() => {}}
    >
      <div className='flex items-baseline gap-2'>
        <div
          className={classNames('w-5 h-5 rounded-full flex items-center justify-center', {
            'bg-green-700': notification.notification_type === NotificationTypesEnum.ORDER_SUCCESS,
            'bg-red-600': notification.notification_type === NotificationTypesEnum.ORDER_FAILED,
            'bg-blue-500': notification.notification_type === NotificationTypesEnum.PROMOTION_CREATED,
            'bg-yellow-700': notification.notification_type === NotificationTypesEnum.SHOP_PRODUCT_ADDED
          })}
        >
          <i
            className={classNames('pi text-xs text-neutral-0', {
              'pi-check': notification.notification_type === NotificationTypesEnum.ORDER_SUCCESS,
              'pi-times': notification.notification_type === NotificationTypesEnum.ORDER_FAILED,
              'pi-info': notification.notification_type === NotificationTypesEnum.PROMOTION_CREATED,
              'pi-exclamation-triangle': notification.notification_type === NotificationTypesEnum.SHOP_PRODUCT_ADDED
            })}
          />
        </div>

        <div className='flex-1'>
          <div className='flex flex-row justify-between items-center'>
            <h4 className='text-base font-semibold break-words overflow-auto mr-3'>{notification.notification_type}</h4>

            {!notification.isRead && <Badge className='!bg-blue-500 !min-w-2 !h-2 cursor-pointer' />}
          </div>

          <div className='max-w-[310px] text-sm mt-1 break-words overflow-auto'>
            {notification.notification_content
              .replace('@@@', notification.notification_options.shop_name)
              .replace('@@@@', notification.notification_options.product_name)}
          </div>

          <p className='text-neutral-600 mt-3 text-xs'>
            {dayjs(notification.createdAt).format('DD/MM/YYYY - HH:mm:ss')}
          </p>
        </div>
      </div>
    </div>
  )
}
