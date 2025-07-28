import { useTranslation } from 'react-i18next'

import { classNames } from 'primereact/utils'

interface NotificationHeaderProps {
  onHide?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function NotificationHeader({ onHide }: NotificationHeaderProps) {
  const { t } = useTranslation('notification')

  return (
    <div className='flex justify-between items-center px-4 py-3 sticky top-0 z-10 bg-neutral-50 h-[var(--notification-header-height)]'>
      <h2 className='text-2xl font-extrabold'>{t('notification_title')}</h2>

      <div className='flex items-center gap-4'>
        <i
          className={classNames('pi pi-check-square', {
            'hover:text-primary-500 cursor-pointer': true,
            'text-neutral-400 cursor-not-allowed': false
          })}
        />

        <i className='pi pi-times cursor-pointer hover:text-red-600' onClick={onHide} />
      </div>
    </div>
  )
}
