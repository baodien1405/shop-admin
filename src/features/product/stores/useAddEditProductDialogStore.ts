import { ProductInterface } from '@/features/product/models'
import { create } from 'zustand'

interface AddEditProductDialog {
  selectedProduct: ProductInterface | null
  setSelectedProduct: (product: ProductInterface | null) => void
}

export const useAddEditProductDialogStore = create<AddEditProductDialog>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product })
}))
