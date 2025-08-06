import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { DiscountAppliesToEnum, DiscountTypeEnum } from '@/features/discount/enums'

const MAX_LENGTH_DISCOUNT_DESCRIPTION = 300
const MIN_DISCOUNT_VALUE = 0
const MAX_DISCOUNT_VALUE = 1000
const MIN_DISCOUNT_MAX_VALUE = 0
const MAX_DISCOUNT_MAX_VALUE = 1000
const MIN_DISCOUNT_MAX_USES = 1
const MAX_DISCOUNT_MAX_USES = 1000
const MIN_DISCOUNT_USES_COUNT = 0
const MAX_DISCOUNT_USES_COUNT = 1000
const MIN_DISCOUNT_MAX_USES_PER_USER = 1
const MAX_DISCOUNT_MAX_USES_PER_USER = 1000

export const useAddEditDiscountSchema = () => {
  const { t } = useTranslation('discount')

  return z.object({
    discount_name: z.string().trim().nonempty(t('discount_validation_required_discount_name')),
    discount_description: z
      .string()
      .trim()
      .nonempty(t('discount_validation_required_discount_description'))
      .max(
        MAX_LENGTH_DISCOUNT_DESCRIPTION,
        t('discount_validation_max_length_discount_description', { maxLength: MAX_LENGTH_DISCOUNT_DESCRIPTION })
      ),
    discount_type: z.enum([DiscountTypeEnum.FIXED_AMOUNT, DiscountTypeEnum.PERCENTAGE], {
      required_error: t('discount_validation_required_discount_type')
    }),
    discount_value: z
      .number()
      .min(MIN_DISCOUNT_VALUE, t('discount_validation_min_discount_value', { minValue: MIN_DISCOUNT_VALUE }))
      .max(MAX_DISCOUNT_VALUE, t('discount_validation_max_discount_value', { maxValue: MAX_DISCOUNT_VALUE })),
    discount_code: z.string().trim().nonempty(t('discount_validation_required_discount_code')),
    discount_start_date: z.date({ message: t('discount_validation_required_discount_start_date') }),
    discount_end_date: z.date({ message: t('discount_validation_required_discount_end_date') }),
    discount_max_uses: z
      .number()
      .min(MIN_DISCOUNT_MAX_USES, t('discount_validation_min_discount_max_uses', { minValue: MIN_DISCOUNT_MAX_USES }))
      .max(MAX_DISCOUNT_MAX_USES, t('discount_validation_max_discount_max_uses', { maxValue: MAX_DISCOUNT_MAX_USES })),
    discount_uses_count: z
      .number()
      .min(
        MIN_DISCOUNT_USES_COUNT,
        t('discount_validation_min_discount_uses_count', { minValue: MIN_DISCOUNT_USES_COUNT })
      )
      .max(
        MAX_DISCOUNT_USES_COUNT,
        t('discount_validation_max_discount_uses_count', { maxValue: MAX_DISCOUNT_USES_COUNT })
      ),
    discount_users_used: z.array(z.string()).optional(),
    discount_max_uses_per_user: z
      .number()
      .min(
        MIN_DISCOUNT_MAX_USES_PER_USER,
        t('discount_validation_min_discount_max_uses_per_user', { minValue: MIN_DISCOUNT_MAX_USES_PER_USER })
      )
      .max(
        MAX_DISCOUNT_MAX_USES_PER_USER,
        t('discount_validation_max_discount_max_uses_per_user', { maxValue: MAX_DISCOUNT_MAX_USES_PER_USER })
      ),
    discount_min_order_value: z
      .number()
      .min(0, t('discount_validation_min_discount_min_order_value', { minValue: 0 }))
      .max(
        MAX_DISCOUNT_MAX_VALUE,
        t('discount_validation_max_discount_min_order_value', { maxValue: MAX_DISCOUNT_MAX_VALUE })
      ),
    discount_max_value: z
      .number()
      .min(
        MIN_DISCOUNT_MAX_VALUE,
        t('discount_validation_min_discount_max_value', { minValue: MIN_DISCOUNT_MAX_VALUE })
      )
      .max(
        MAX_DISCOUNT_MAX_VALUE,
        t('discount_validation_max_discount_max_value', { maxValue: MAX_DISCOUNT_MAX_VALUE })
      ),
    discount_is_active: z.boolean().optional(),
    discount_applies_to: z.enum([DiscountAppliesToEnum.ALL, DiscountAppliesToEnum.SPECIFIC], {
      required_error: t('discount_validation_required_discount_applies_to')
    }),
    discount_product_ids: z.array(z.string()).optional()
  })
}
