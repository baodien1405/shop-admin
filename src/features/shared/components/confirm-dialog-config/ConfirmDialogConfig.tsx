import { ConfirmDialog } from 'primereact/confirmdialog'
import { classNames } from 'primereact/utils'
import { useTranslation } from 'react-i18next'

export function ConfirmDialogConfig() {
  const { t } = useTranslation('shared')

  return (
    <ConfirmDialog
      closable={false}
      resizable={false}
      draggable={false}
      headerClassName='bg-neutral-50 text-center py-4'
      className={classNames(
        'min-w-[660px]',
        '[&_.p-dialog-footer]:grid',
        '[&_.p-dialog-footer]:grid-cols-6',
        '[&_.p-dialog-footer]:gap-6'
      )}
      contentClassName={classNames(
        'pt-4 pb-8 whitespace-pre-line',
        '[&_.p-confirm-dialog-message]:ml-0',
        '[&_.p-confirm-dialog-message]:w-full',
        '[&_.p-confirm-dialog-message]:text-center'
      )}
      rejectClassName='mr-0 col-start-2 col-end-4 h-9 text-sm bg-primary-25 text-primary-500 hover:bg-primary-50 active:bg-primary-100'
      acceptClassName='mr-0 col-start-4 col-end-6 h-9 text-sm'
      defaultFocus='accept'
      acceptLabel={t('shared_btn_confirm')}
      rejectLabel={t('shared_btn_cancel')}
    />
  )
}
