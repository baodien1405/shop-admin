import { useForm } from '@tanstack/react-form'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { ProductFiltersParamsType, ProductFiltersPayloadInterface } from '@/features/product/models'

interface DraftProductFiltersProps {
  initialValues?: ProductFiltersPayloadInterface
  onChange?: (payload: Partial<ProductFiltersParamsType>) => void
}

export function DraftProductFilters({ initialValues, onChange }: DraftProductFiltersProps) {
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      ...initialValues
    },
    onSubmit: ({ value }) => {
      const payload = {
        ...value,
        page: 1
      }

      onChange?.(payload)
    }
  })

  return (
    <form
      className='flex items-center justify-between gap-8 mb-6 w-full'
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
    >
      <section className='grid grid-cols-2 gap-6 w-full relative'>
        <Field
          name='keyword'
          children={(field) => (
            <div className='p-inputgroup'>
              <InputText
                className='w-2/6'
                type='search'
                placeholder='Search...'
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />

              <Button icon={PrimeIcons.SEARCH} onClick={handleSubmit} />
            </div>
          )}
        />
      </section>
    </form>
  )
}
