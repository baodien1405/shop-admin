import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { ProductTypeEnum } from '@/features/product/enums'

const MAX_LENGTH_PRODUCT_DESCRIPTION = 300

export const useAddEditProductSchema = () => {
  const { t } = useTranslation('product')

  return z.object({
    product_name: z.string().nonempty(t('product_validation_required_product_name')),
    product_description: z
      .string()
      .nonempty(t('product_validation_required_product_description'))
      .max(
        MAX_LENGTH_PRODUCT_DESCRIPTION,
        t('product_validation_max_length_product_description', { maxLength: MAX_LENGTH_PRODUCT_DESCRIPTION })
      ),
    product_price: z.number().min(0, t('product_validation_min_product_price')),
    product_quantity: z.number().min(0, t('product_validation_min_product_quantity')),
    product_type: z.enum([ProductTypeEnum.ELECTRONICS, ProductTypeEnum.CLOTHING, ProductTypeEnum.FURNITURE], {
      required_error: t('product_validation_required_product_type')
    }),
    product_ratingsAverage: z.number().min(0, t('product_validation_min_product_ratings_average')),
    product_attributes: z.object({
      brand: z.string().optional(),
      size: z.string().optional(),
      material: z.string().optional(),

      manufacturer: z.string().optional(),
      model: z.string().optional(),
      color: z.string().optional()
    }),
    product_thumbnail: z.instanceof(File).nullable()
  })
}
