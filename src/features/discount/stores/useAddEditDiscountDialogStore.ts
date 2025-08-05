import { DiscountInterface } from '@/features/discount/models'
import { create } from 'zustand'

interface AddEditDiscountDialog {
  selectedDiscount: DiscountInterface | null
  setSelectedDiscount: (discount: DiscountInterface | null) => void
}

export const useAddEditDiscountDialogStore = create<AddEditDiscountDialog>((set) => ({
  selectedDiscount: null,
  setSelectedDiscount: (discount) => set({ selectedDiscount: discount })
}))
