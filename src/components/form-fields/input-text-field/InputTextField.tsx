import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { DCInputText, DCInputTextProps } from '@/components'

export type InputTextFieldProps<T extends FieldValues> = DCInputTextProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  showLimit?: boolean
  inputClassName?: string
  rootClassName?: string
}

export function InputTextField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  showLimit,
  rootClassName,
  inputClassName,
  maxLength,
  value: externalValue,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ...rest
}: InputTextFieldProps<T>) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <div className={rootClassName}>
      {label && (
        <div className='flex items-center justify-between mb-1'>
          <div className='flex items-center gap-1'>
            <label className='text-sm font-semibold text-neutral-600'>{label}</label>

            {required && <span className='text-red-700'>*</span>}
          </div>

          {showLimit && (
            <span className='text-xs text-neutral-600'>
              {value?.length}/{maxLength} ký tự
            </span>
          )}
        </div>
      )}

      <DCInputText
        className={inputClassName}
        name={name}
        invalid={invalid}
        value={value}
        onChange={(event) => {
          onChange(event)
          externalOnChange?.(event)
        }}
        onBlur={onBlur}
        {...rest}
      />

      {error?.message && <p className='mt-1 text-xs text-red-700'>{error.message}</p>}
    </div>
  )
}
