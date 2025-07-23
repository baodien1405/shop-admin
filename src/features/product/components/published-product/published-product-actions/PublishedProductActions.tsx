import { useTranslation } from 'react-i18next'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'

interface PublishedProductActionsProps {
  isExporting: boolean
  onExport: () => void
}

export function PublishedProductActions({ isExporting, onExport }: PublishedProductActionsProps) {
  const { t } = useTranslation('shared')

  return (
    <div className='grid grid-cols-3 gap-6'>
      <Button
        label={t('shared_btn_export_data')}
        type='button'
        size='small'
        outlined
        severity='secondary'
        icon={PrimeIcons.DOWNLOAD}
        loading={isExporting}
        disabled={isExporting}
        className='!h-9 col-start-3 col-end-4'
        onClick={onExport}
      />
    </div>
  )
}
