import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'

import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'

import { ProductInterface } from '@/features/product/models'
import { FormField, UploadImage } from '@/features/shared/components'
import { FormId, PRODUCT_TYPE_OPTIONS } from '@/features/product/constants'
import { ProductTypeEnum } from '@/features/product/enums'
import { FileWithObjectURL } from '@/features/shared/models'
import { useAddEditProductSchema } from '@/features/product/hooks'

interface ProductFormProps {
  initialValues?: Partial<ProductInterface> | null
  onSubmit?: (values: Partial<ProductInterface>) => void
}

export function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const { t } = useTranslation('product')
  const addEditProductSchema = useAddEditProductSchema()
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      ...initialValues,
      product_name: initialValues?.product_name || '',
      product_description: initialValues?.product_description || '',
      product_price: initialValues?.product_price || 0,
      product_quantity: initialValues?.product_quantity || 0,
      product_thumbnail: initialValues?.product_thumb
        ? ({ objectURL: initialValues?.product_thumb } as FileWithObjectURL)
        : null
    },
    validators: {
      onSubmit: addEditProductSchema
    },
    onSubmit: async ({ value }) => {
      onSubmit?.(value)
    }
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
        name='product_name'
        children={(field) => (
          <FormField>
            <FormField.Label>{t('product_name_label')}</FormField.Label>
            <InputText
              placeholder={t('product_name_placeholder')}
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
        name='product_price'
        children={(field) => (
          <FormField>
            <FormField.Label>{t('product_price_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('product_price_placeholder')}
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
        name='product_quantity'
        children={(field) => (
          <FormField>
            <FormField.Label>{t('product_quantity_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('product_quantity_placeholder')}
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
        name='product_type'
        children={(field) => (
          <FormField>
            <FormField.Label>{t('product_type_label')}</FormField.Label>
            <Dropdown
              className='w-full'
              placeholder={t('product_type_placeholder')}
              value={field.state.value}
              options={PRODUCT_TYPE_OPTIONS.map((x) => ({ label: t(x.label), value: x.value }))}
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
        name='product_ratingsAverage'
        children={(field) => (
          <FormField>
            <FormField.Label>{t('product_ratings_average_label')}</FormField.Label>
            <InputNumber
              className='w-full'
              placeholder={t('product_ratings_average_placeholder')}
              value={field.state.value}
              invalid={!!field.state.meta.errors.length}
              onValueChange={(e) => field.handleChange(e.value || 0)}
              onBlur={field.handleBlur}
            />
            <FormField.Message field={field} />
          </FormField>
        )}
      />

      <Subscribe
        selector={(state) => state.values.product_type}
        children={(product_type) => {
          if ([ProductTypeEnum.CLOTHING, ProductTypeEnum.FURNITURE].includes(product_type as ProductTypeEnum)) {
            return (
              <>
                <Field name='product_attributes.brand'>
                  {(field) => (
                    <FormField>
                      <FormField.Label>{t('product_product_attributes_brand_label')}</FormField.Label>
                      <InputText
                        placeholder={t('product_product_attributes_brand_placeholder')}
                        className='w-full'
                        invalid={!!field.state.meta.errors.length}
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FormField.Message field={field} />
                    </FormField>
                  )}
                </Field>

                <Field name='product_attributes.size'>
                  {(field) => (
                    <FormField>
                      <FormField.Label>{t('product_product_attributes_size_label')}</FormField.Label>
                      <InputText
                        placeholder={t('product_product_attributes_size_placeholder')}
                        className='w-full'
                        invalid={!!field.state.meta.errors.length}
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FormField.Message field={field} />
                    </FormField>
                  )}
                </Field>

                <Field name='product_attributes.material'>
                  {(field) => (
                    <FormField>
                      <FormField.Label>{t('product_product_attributes_material_label')}</FormField.Label>
                      <InputText
                        placeholder={t('product_product_attributes_material_placeholder')}
                        className='w-full'
                        invalid={!!field.state.meta.errors.length}
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FormField.Message field={field} />
                    </FormField>
                  )}
                </Field>
              </>
            )
          }

          if (product_type === ProductTypeEnum.ELECTRONICS) {
            return (
              <>
                <Field name='product_attributes.manufacturer'>
                  {(field) => (
                    <FormField>
                      <FormField.Label>{t('product_product_attributes_manufacturer_label')}</FormField.Label>
                      <InputText
                        placeholder={t('product_product_attributes_manufacturer_placeholder')}
                        className='w-full'
                        invalid={!!field.state.meta.errors.length}
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FormField.Message field={field} />
                    </FormField>
                  )}
                </Field>

                <Field name='product_attributes.model'>
                  {(field) => (
                    <FormField>
                      <FormField.Label>{t('product_product_attributes_model_label')}</FormField.Label>
                      <InputText
                        placeholder={t('product_product_attributes_model_placeholder')}
                        className='w-full'
                        invalid={!!field.state.meta.errors.length}
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FormField.Message field={field} />
                    </FormField>
                  )}
                </Field>

                <Field name='product_attributes.color'>
                  {(field) => (
                    <FormField>
                      <FormField.Label>{t('product_product_attributes_color_label')}</FormField.Label>
                      <InputText
                        placeholder={t('product_product_attributes_color_placeholder')}
                        className='w-full'
                        invalid={!!field.state.meta.errors.length}
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FormField.Message field={field} />
                    </FormField>
                  )}
                </Field>
              </>
            )
          }
        }}
      />

      <Field
        name='product_description'
        children={(field) => (
          <FormField>
            <FormField.Label>{t('product_description_label')}</FormField.Label>
            <InputTextarea
              className='w-full'
              placeholder={t('product_description_placeholder')}
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
        name='product_thumbnail'
        children={(field) => {
          return (
            <FormField>
              <FormField.Label>{t('product_thumb_label')}</FormField.Label>
              <UploadImage
                label={t('product_thumb_label')}
                name={field.name}
                value={field.state.value}
                onChange={(payload) => field.handleChange(payload)}
              />
              <FormField.Message field={field} />
            </FormField>
          )
        }}
      />
    </form>
  )
}
