import { FileWithObjectURL, ListParamsInterface } from '@/features/shared/models'

export interface ProductInterface {
  _id: string
  product_name: string
  product_thumb: string
  product_description: string
  product_slug: string
  product_variations: Array<string>
  product_price: number
  product_quantity: number
  product_type: string
  product_ratingsAverage: number
  createdAt: Date | null
  updatedAt: Date | null
  product_attributes?: Record<string, string>
  product_thumbnail?: FileWithObjectURL | null

  isDraft?: boolean
  isPublished?: boolean
}

export interface ProductFiltersPayloadInterface {
  keyword: string
}

export type ProductFiltersParamsType = ListParamsInterface & ProductFiltersPayloadInterface
