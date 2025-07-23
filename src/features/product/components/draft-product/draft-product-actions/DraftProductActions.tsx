import { useTranslation } from 'react-i18next'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'

import { useAddEditProductDialogStore } from '@/features/product/stores'
import { ProductInterface } from '@/features/product/models'

interface DraftProductActionsProps {
  isExporting: boolean
  onExport: () => void
}

export function DraftProductActions({ isExporting, onExport }: DraftProductActionsProps) {
  const { t } = useTranslation('shared')
  const setSelectedProduct = useAddEditProductDialogStore((state) => state.setSelectedProduct)

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
        onClick={() => setSelectedProduct({} as ProductInterface)}
      />
    </div>
  )
}
