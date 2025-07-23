import { ProductTypeEnum } from '@/features/product/enums'

export const PRODUCT_TYPE_OPTIONS = [
  { label: 'product_type_clothing', value: ProductTypeEnum.CLOTHING },
  { label: 'product_type_electronics', value: ProductTypeEnum.ELECTRONICS },
  { label: 'product_type_furniture', value: ProductTypeEnum.FURNITURE }
] as const
