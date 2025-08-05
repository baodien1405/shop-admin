import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'

import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar'
import { InputSwitch } from 'primereact/inputswitch'
import { MultiSelect } from 'primereact/multiselect'

import { DISCOUNT_APPLIES_TO_OPTIONS, DISCOUNT_TYPE_OPTIONS } from '@/features/discount/constants'
import { DiscountInterface } from '@/features/discount/models'
import { FormId } from '@/features/product/constants'
import { FormField } from '@/features/shared/components'
import { usePublishedProductListQuery } from '@/features/product/hooks'
import { DiscountAppliesToEnum } from '@/features/discount/enums'

interface DiscountFormProps {
  initialValues?: Partial<DiscountInterface> | null
  onSubmit?: (values: Partial<DiscountInterface>) => void
}

export function DiscountForm({ initialValues, onSubmit }: DiscountFormProps) {
  const { t } = useTranslation('discount')
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      ...initialValues,
      discount_start_date: initialValues?.discount_start_date ? new Date(initialValues.discount_start_date) : null,
      discount_end_date: initialValues?.discount_end_date ? new Date(initialValues.discount_end_date) : null
    },
    onSubmit: async ({ value }) => {
      onSubmit?.(value)
    }
  })

  const { data: publishedProductListData, isFetching: isLoadingPublishedProductList } = usePublishedProductListQuery({
    page: 1,
    limit: 100,
    keyword: ''
  })

  return (
    <form
      id={FormId.ADD_EDIT_PRODUCT}
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4'
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
    >
      <Field
        name='discount_name'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_name_label')}</FormField.Label>
            <InputText
              placeholder={t('discount_name_placeholder')}
              className='w-full'
              invalid={!!field.state.meta.errors.length}
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_code'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_code_label')}</FormField.Label>
            <InputText
              placeholder={t('discount_code_placeholder')}
              className='w-full'
              invalid={!!field.state.meta.errors.length}
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_type'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_type_label')}</FormField.Label>
            <Dropdown
              className='w-full'
              placeholder={t('discount_type_placeholder')}
              value={field.state.value}
              options={DISCOUNT_TYPE_OPTIONS}
              optionLabel='label'
              checkmark
              showClear
              onChange={(e) => field.handleChange(e.value)}
              onBlur={field.handleBlur}
              invalid={!!field.state.meta.errors.length}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_value'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_value_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('discount_value_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_max_value'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_max_value_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('discount_max_value_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_min_order_value'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_min_order_value_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('discount_min_order_value_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_start_date'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_start_date_label')}</FormField.Label>
            <Calendar
              showIcon
              placeholder={t('discount_start_date_placeholder')}
              className='w-full'
              value={field.state.value}
              onChange={(e) => field.handleChange(e.value ?? null)}
              onBlur={field.handleBlur}
              invalid={!!field.state.meta.errors.length}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />
      <Field
        name='discount_end_date'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_end_date_label')}</FormField.Label>
            <Calendar
              showIcon
              placeholder={t('discount_end_date_placeholder')}
              className='w-full'
              value={field.state.value}
              onChange={(e) => field.handleChange(e.value ?? null)}
              onBlur={field.handleBlur}
              invalid={!!field.state.meta.errors.length}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_max_uses'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_max_uses_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('discount_max_uses_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_max_uses_per_user'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_max_uses_per_user_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('discount_max_uses_per_user_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_uses_count'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_uses_count_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('discount_uses_count_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_applies_to'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_applies_to_label')}</FormField.Label>
            <Dropdown
              className='w-full'
              placeholder={t('discount_applies_to_placeholder')}
              value={field.state.value}
              options={DISCOUNT_APPLIES_TO_OPTIONS}
              optionLabel='label'
              checkmark
              showClear
              onChange={(e) => field.handleChange(e.value)}
              onBlur={field.handleBlur}
              invalid={!!field.state.meta.errors.length}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Subscribe
        selector={(state) => state.values.discount_applies_to}
        children={(discount_applies_to) => {
          if (DiscountAppliesToEnum.SPECIFIC === discount_applies_to) {
            return (
              <Field
                name='discount_product_ids'
                children={(field) => (
                  <FormField>
                    <FormField.Label>{t('discount_product_ids_label')}</FormField.Label>
                    <MultiSelect
                      className='w-full'
                      display='chip'
                      placeholder={t('discount_product_ids_placeholder')}
                      value={field.state.value}
                      filter
                      loading={isLoadingPublishedProductList}
                      options={
                        publishedProductListData?.items?.map((item) => ({
                          label: item.product_name,
                          value: item._id
                        })) || []
                      }
                      virtualScrollerOptions={{ itemSize: 60 }}
                      maxSelectedLabels={2}
                      optionLabel='label'
                      onChange={(e) => field.handleChange(e.value)}
                      onBlur={field.handleBlur}
                      invalid={!!field.state.meta.errors.length}
                    />
                    <FormField.Message field={field} />
                  </FormField>
                )}
              />
            )
          }
        }}
      />

      <Field
        name='discount_description'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_description_label')}</FormField.Label>
            <InputTextarea
              className='w-full'
              placeholder={t('discount_description_placeholder')}
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              invalid={!!field.state.meta.errors.length}
              autoResize
              rows={5}
              cols={30}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Field
        name='discount_is_active'
        children={(field) => (
          <FormField>
            <FormField.Label required>{t('discount_is_active_label')}</FormField.Label>
            <InputSwitch
              checked={!!field.state.value}
              onChange={(e) => field.handleChange(e.value)}
              onBlur={field.handleBlur}
              invalid={!!field.state.meta.errors.length}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />
    </form>
  )
}
