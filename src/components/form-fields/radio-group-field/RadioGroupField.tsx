import { RadioButton, RadioButtonProps } from 'primereact/radiobutton'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface RadioOption {
  label: string
  value: any
}

export type RadioGroupFieldProps<T extends FieldValues> = RadioButtonProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  rootClassName?: string
  options: RadioOption[]
  direction?: 'vertical' | 'horizontal'
}

export function RadioGroupField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  disabled,
  rootClassName,
  options,
  direction = 'horizontal',
  ...rest
}: RadioGroupFieldProps<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <div className={rootClassName}>
      {label && (
        <label className='mb-[10px] block w-fit text-[14px] leading-4 font-medium text-[#1F1F1F]'>{label}</label>
      )}

      <div
        className={classNames('flex flex-wrap gap-3', {
          'flex-column': direction === 'vertical'
        })}
      >
        {options.map((option) => (
          <div className='flex items-center' key={option.value}>
            <RadioButton
              inputId={option.value}
              name={name}
              value={option.value}
              onChange={(event) => {
                onChange(event)
                externalOnChange?.(event)
              }}
              onBlur={onBlur}
              checked={option.value === value}
              invalid={invalid}
              disabled={disabled}
              ref={ref}
              {...rest}
            />

            <label htmlFor={option.value} className='ml-2'>
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
