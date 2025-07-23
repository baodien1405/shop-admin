import { useTranslation } from 'react-i18next'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'

import { useAddEditProductDialogStore } from '@/features/product/stores'
import { FormId } from '@/features/product/constants'
import { ToastService } from '@/features/shared/services'
import { getErrorMessage } from '@/features/shared/utils'
import { usePublishProductMutation, useUnpublishProductMutation } from '@/features/product/hooks'

interface ProductDialogHeaderProps {
  isPublishing?: boolean
  isAdding?: boolean
  isEditing?: boolean
  isUploading?: boolean
  onClose: () => void
}

export function ProductDialogHeader({ isAdding, isEditing, isUploading, onClose }: ProductDialogHeaderProps) {
  const { t } = useTranslation(['product', 'shared'])
  const { mutateAsync: publishProductMutateAsync, isPending: isPublishing } = usePublishProductMutation()
  const { mutateAsync: unpublishProductMutateAsync, isPending: isUnpublishPending } = useUnpublishProductMutation()
  const selectedProduct = useAddEditProductDialogStore((state) => state.selectedProduct)
  const isEditMode = Boolean(selectedProduct?._id)

  const handlePublishProduct = async () => {
    if (!selectedProduct?._id || isPublishing) return

    try {
      const response = await publishProductMutateAsync(selectedProduct._id)

      ToastService.success({
        summary: t('shared_toast_success_summary', { ns: 'shared' }),
        detail: response?.data?.message
      })

      onClose()
    } catch (error) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: getErrorMessage(error)
      })
    }
  }

  const handleUnpublishProduct = async () => {
    if (!selectedProduct?._id || isUnpublishPending) return

    try {
      const response = await unpublishProductMutateAsync(selectedProduct._id)

      ToastService.success({
        summary: t('shared_toast_success_summary', { ns: 'shared' }),
        detail: response?.data?.message
      })

      onClose()
    } catch (error) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: getErrorMessage(error)
      })
    }
  }

  return (
    <section className='grid grid-cols-12 gap-4 items-center'>
      <h1 className='col-span-8 text-3xl text-neutral-950 font-extrabold truncate'>
        {!isEditMode && t('product_add_title', { ns: 'product' })}
        {isEditMode && t('product_edit_title', { ns: 'product', productName: selectedProduct?.product_name })}
      </h1>

      <div
        className={classNames('col-span-4 grid gap-4', {
          'grid-cols-3': isEditMode,
          'grid-cols-2': !isEditMode
        })}
      >
        <Button
          size='small'
          label={t('shared_btn_close', { ns: 'shared' })}
          severity='secondary'
          icon={PrimeIcons.TIMES_CIRCLE}
          type='button'
          onClick={onClose}
        />

        {isEditMode && selectedProduct?.isDraft && (
          <Button
            size='small'
            label={t('shared_btn_publish', { ns: 'shared' })}
            outlined
            severity='secondary'
            className='!h-9'
            type='button'
            icon={PrimeIcons.UNLOCK}
            loading={isPublishing}
            disabled={isEditing || isUploading}
            onClick={handlePublishProduct}
          />
        )}

        {isEditMode && selectedProduct?.isPublished && (
          <Button
            size='small'
            label={t('shared_btn_unpublish', { ns: 'shared' })}
            outlined
            severity='secondary'
            className='!h-9'
            type='button'
            icon={PrimeIcons.LOCK}
            loading={isUnpublishPending}
            disabled={isEditing || isUploading}
            onClick={handleUnpublishProduct}
          />
        )}

        <Button
          size='small'
          label={isEditMode ? t('shared_btn_save', { ns: 'shared' }) : t('shared_btn_add', { ns: 'shared' })}
          icon={isEditMode ? PrimeIcons.SAVE : PrimeIcons.PLUS}
          loading={isAdding || isEditing}
          disabled={isPublishing || isUploading}
          type='submit'
          form={FormId.ADD_EDIT_PRODUCT}
        />
      </div>
    </section>
  )
}
