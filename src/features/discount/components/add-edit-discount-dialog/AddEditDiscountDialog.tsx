// import { useTranslation } from 'react-i18next'

import { Dialog } from 'primereact/dialog'

import { useAddEditDiscountDialogStore } from '@/features/discount/stores'
import { DiscountDialogHeader } from '@/features/discount/components/add-edit-discount-dialog/discount-dialog-header'
import { DiscountForm } from '@/features/discount/components/add-edit-discount-dialog/discount-form'
import { DiscountInterface } from '@/features/discount/models'

export function AddEditDiscountDialog() {
  // const { t } = useTranslation(['discount', 'shared'])
  const selectedDiscount = useAddEditDiscountDialogStore((state) => state.selectedDiscount)
  const setSelectedDiscount = useAddEditDiscountDialogStore((state) => state.setSelectedDiscount)

  // const isEditMode = Boolean(selectedDiscount?._id)

  const handleDialogClose = () => {
    setSelectedDiscount(null)
  }

  const handleAddEditDiscount = async (values: Partial<DiscountInterface>) => {
    // Implement the logic to add or edit a discount
    // This is a placeholder for the actual implementation
    console.log('Add/Edit Discount:', values)
  }

  return (
    <Dialog
      header={<DiscountDialogHeader isAdding={false} isEditing={false} onClose={handleDialogClose} />}
      headerClassName='px-6 py-4 bg-neutral-50 rounded-t-xl'
      draggable={false}
      visible={Boolean(selectedDiscount)}
      onHide={handleDialogClose}
      blockScroll
      position='top'
      closable={false}
      maximized
    >
      <DiscountForm initialValues={selectedDiscount} onSubmit={handleAddEditDiscount} />
    </Dialog>
  )
}
