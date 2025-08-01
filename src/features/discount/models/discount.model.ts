import { DiscountAppliesToEnum, DiscountTypeEnum } from '@/features/discount/enums'
import { ListParamsInterface } from '@/features/shared/models'

export interface DiscountInterface {
  _id: string
  discount_name: string
  discount_description: string
  discount_type: DiscountTypeEnum
  discount_value: number
  discount_code: string
  discount_start_date: string
  discount_end_date: string
  discount_max_uses: number
  discount_uses_count: number
  discount_users_used: string[]
  discount_max_uses_per_user: number
  discount_min_order_value: number
  discount_max_value: number
  discount_is_active: boolean
  discount_applies_to: DiscountAppliesToEnum
  discount_product_ids?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface DiscountFiltersPayloadInterface {
  keyword: string
  sortBy?: string
  order?: string
}

export type DiscountFiltersParamsType = ListParamsInterface & DiscountFiltersPayloadInterface
