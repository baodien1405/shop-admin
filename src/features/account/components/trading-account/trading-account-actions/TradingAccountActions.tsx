import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'

export interface TradingAccountActionsProps {
  isExporting: boolean
  onExport: () => void
}

export function TradingAccountActions({ isExporting, onExport }: TradingAccountActionsProps) {
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
        className='!h-9'
        onClick={onExport}
      />

      <Button
        label={t('shared_btn_import_data')}
        type='button'
        size='small'
        severity='secondary'
        icon={<span className='pi pi-file-import p-button-icon mr-2 text-sm' />}
        loading={false}
        disabled={false}
        onClick={() => {}}
      />

      <Button
        label={t('shared_btn_add')}
        type='button'
        size='small'
        icon={PrimeIcons.PLUS}
        loading={false}
        disabled={false}
        onClick={() => {}}
      />
    </div>
  )
}
