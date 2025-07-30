import { useForm } from '@tanstack/react-form'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { ActiveUserFiltersParamsType, ActiveUserFiltersPayloadInterface } from '@/features/user/models'

interface ActiveUserFiltersProps {
  initialValues?: ActiveUserFiltersPayloadInterface
  onChange?: (payload: Partial<ActiveUserFiltersParamsType>) => void
}

export function ActiveUserFilters({ initialValues, onChange }: ActiveUserFiltersProps) {
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      ...initialValues
    },
    onSubmit: ({ value }) => {
      const payload = {
        ...value,
        pageNumber: 1
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
