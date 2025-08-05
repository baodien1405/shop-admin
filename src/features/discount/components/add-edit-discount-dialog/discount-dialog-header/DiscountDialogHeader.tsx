import { useTranslation } from 'react-i18next'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'

import { useAddEditDiscountDialogStore } from '@/features/discount/stores'
import { FormId } from '@/features/discount/constants'

interface DiscountDialogHeaderProps {
  isAdding?: boolean
  isEditing?: boolean
  onClose: () => void
}

export function DiscountDialogHeader({ isAdding, isEditing, onClose }: DiscountDialogHeaderProps) {
  const { t } = useTranslation(['product', 'shared'])
  const selectedDiscount = useAddEditDiscountDialogStore((state) => state.selectedDiscount)
  const isEditMode = Boolean(selectedDiscount?._id)

  return (
    <section className='grid grid-cols-12 gap-4 items-center'>
      <h1 className='col-span-8 text-3xl text-neutral-950 font-extrabold truncate'>
        {!isEditMode && t('discount_add_title', { ns: 'discount' })}
        {isEditMode && t('discount_edit_title', { ns: 'discount', discountName: selectedDiscount?.discount_name })}
      </h1>

      <div className={classNames('col-span-4 grid grid-cols-2 gap-4')}>
        <Button
          size='small'
          label={t('shared_btn_close', { ns: 'shared' })}
          severity='secondary'
          icon={PrimeIcons.TIMES_CIRCLE}
          type='button'
          onClick={onClose}
        />

        <Button
          size='small'
          label={isEditMode ? t('shared_btn_save', { ns: 'shared' }) : t('shared_btn_add', { ns: 'shared' })}
          icon={isEditMode ? PrimeIcons.SAVE : PrimeIcons.PLUS}
          loading={isAdding || isEditing}
          type='submit'
          form={FormId.ADD_EDIT_DISCOUNT}
        />
      </div>
    </section>
  )
}
