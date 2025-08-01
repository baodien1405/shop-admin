import { DiscountAppliesToEnum, DiscountTypeEnum } from '@/features/discount/enums'

export const DISCOUNT_TYPE_OPTIONS = [
  { label: 'Percentage', value: DiscountTypeEnum.PERCENTAGE },
  { label: 'Fixed Amount', value: DiscountTypeEnum.FIXED_AMOUNT }
]

export const DISCOUNT_TYPE_OPTIONS_MAP: Record<DiscountTypeEnum, string> = {
  [DiscountTypeEnum.PERCENTAGE]: 'Percentage',
  [DiscountTypeEnum.FIXED_AMOUNT]: 'Fixed Amount'
}

export const DISCOUNT_APPLIES_TO_OPTIONS = [
  { label: 'All Products', value: DiscountAppliesToEnum.ALL },
  { label: 'Specific Products', value: DiscountAppliesToEnum.SPECIFIC }
]
