import { useTranslation } from 'react-i18next'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'

import { useAddEditDiscountDialogStore } from '@/features/discount/stores'
import { DiscountInterface } from '@/features/discount/models'

export function DiscountActions() {
  const { t } = useTranslation('shared')
  const setSelectedDiscount = useAddEditDiscountDialogStore((state) => state.setSelectedDiscount)

  return (
    <div className='grid grid-cols-3 gap-6'>
      <Button
        label={t('shared_btn_add')}
        type='button'
        size='small'
        className='col-start-3 col-end-4'
        icon={PrimeIcons.PLUS}
        loading={false}
        disabled={false}
        onClick={() => setSelectedDiscount({} as DiscountInterface)}
      />
    </div>
  )
}
