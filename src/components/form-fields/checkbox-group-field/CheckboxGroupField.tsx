import { Checkbox, CheckboxChangeEvent, CheckboxProps } from 'primereact/checkbox'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface CheckboxOption {
  label: string
  value: any
}

export type CheckboxGroupFieldProps<T extends FieldValues> = Omit<CheckboxProps, 'checked'> & {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  options: CheckboxOption[]
  direction?: 'vertical' | 'horizontal'
  rootClassName?: string
  labelClassName?: string
  errorClassName?: string
  checkboxLabelClassName?: string
  wrapperCheckboxClassName?: string
}

export function CheckboxGroupField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  disabled,
  rootClassName,
  labelClassName,
  errorClassName,
  checkboxLabelClassName,
  wrapperCheckboxClassName,
  options,
  direction = 'horizontal',
  ...rest
}: CheckboxGroupFieldProps<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  const handleChange = (e: CheckboxChangeEvent) => {
    let checkedList = value ? [...value] : []

    if (checkedList.includes(e.value)) {
      checkedList = checkedList.filter((option) => option !== e.value)
    } else {
      checkedList.push(e.value)
    }

    onChange(checkedList)
  }

  return (
    <div className={rootClassName}>
      {label && (
        <label
          className={classNames(
            'mb-[10px] block w-fit text-[14px] leading-4 font-medium text-[#1F1F1F]',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <div
        className={classNames(
          'flex flex-wrap gap-3',
          {
            'flex-column': direction === 'vertical'
          },
          wrapperCheckboxClassName
        )}
      >
        {options.map((option) => (
          <div className='flex items-center' key={option.value}>
            <Checkbox
              inputId={option.value}
              name={name}
              value={option.value}
              onChange={handleChange}
              onBlur={onBlur}
              invalid={invalid}
              disabled={disabled}
              inputRef={ref}
              {...rest}
              checked={value?.includes(option.value)}
            />

            <label htmlFor={option.value} className={classNames('ml-2', checkboxLabelClassName)}>
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {error?.message && (
        <p className={classNames('my-2 text-start text-xs text-red-500', errorClassName)}>{error.message}</p>
      )}
    </div>
  )
}
