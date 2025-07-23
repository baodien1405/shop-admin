import { useTranslation } from 'react-i18next'

import { Dialog } from 'primereact/dialog'

import { ProductDialogHeader } from '@/features/product/components/add-edit-product-dialog/product-dialog-header'
import { ProductForm } from '@/features/product/components/add-edit-product-dialog/product-form'
import { useAddProductMutation, useEditProductMutation, useUploadProductImageMutation } from '@/features/product/hooks'
import type { ProductInterface } from '@/features/product/models'
import { useAddEditProductDialogStore } from '@/features/product/stores'
import { FileWithObjectURL } from '@/features/shared/models'
import { ToastService } from '@/features/shared/services'
import { getErrorMessage } from '@/features/shared/utils'

export function AddEditProductDialog() {
  const { t } = useTranslation(['product', 'shared'])
  const selectedProduct = useAddEditProductDialogStore((state) => state.selectedProduct)
  const setSelectedProduct = useAddEditProductDialogStore((state) => state.setSelectedProduct)
  const { mutateAsync: uploadProductImageMutateAsync, isPending: isUploading } = useUploadProductImageMutation()
  const { mutateAsync: addProductMutateAsync, isPending: isAdding } = useAddProductMutation()
  const { mutateAsync: editProductMutateAsync, isPending: isEditing } = useEditProductMutation()

  const isEditMode = Boolean(selectedProduct?._id)

  const handleDialogClose = () => {
    setSelectedProduct(null)
  }

  const uploadProductImage = async (file: FileWithObjectURL) => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await uploadProductImageMutateAsync(formData)

      return response.data.metadata
    } catch (error) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: getErrorMessage(error)
      })
    }
  }

  const handleAddEditProduct = async (values: Partial<ProductInterface>) => {
    try {
      const payload = { ...values }
      const productThumbnail = payload.product_thumbnail

      if (productThumbnail && productThumbnail instanceof File) {
        const productImageURL = await uploadProductImage(productThumbnail)

        if (productImageURL) payload.product_thumb = productImageURL
      }

      delete payload.product_thumbnail
      const response = isEditMode ? await editProductMutateAsync(payload) : await addProductMutateAsync(payload)

      ToastService.success({
        summary: t('shared_toast_success_summary', { ns: 'shared' }),
        detail: response?.data?.message
      })

      handleDialogClose()
    } catch (error) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: getErrorMessage(error)
      })
    }
  }

  return (
    <Dialog
      header={
        <ProductDialogHeader
          isAdding={isAdding}
          isEditing={isEditing}
          isUploading={isUploading}
          onClose={handleDialogClose}
        />
      }
      headerClassName='px-6 py-4 bg-neutral-50 rounded-t-xl'
      draggable={false}
      visible={Boolean(selectedProduct)}
      onHide={handleDialogClose}
      blockScroll
      position='top'
      closable={false}
      maximized
    >
      <ProductForm initialValues={selectedProduct} onSubmit={handleAddEditProduct} />
    </Dialog>
  )
}
