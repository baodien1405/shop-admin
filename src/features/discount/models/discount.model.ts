import { ListParamsInterface } from '@/features/shared/models'

export interface DiscountInterface {
  _id: string
  discount_name: string
  discount_code: string
}

export interface DiscountFiltersPayloadInterface {
  keyword: string
  sortBy?: string
  order?: string
}

export type DiscountFiltersParamsType = ListParamsInterface & DiscountFiltersPayloadInterface
