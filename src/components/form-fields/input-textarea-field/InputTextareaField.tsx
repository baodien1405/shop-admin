import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type InputTextareaFieldProps<T extends FieldValues> = InputTextareaProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  inputTextareaClassName?: string
  rootClassName?: string
}

export function InputTextareaField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  disabled,
  rootClassName,
  inputTextareaClassName,
  ...rest
}: InputTextareaFieldProps<T>) {
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

      <InputTextarea
        className={classNames('w-full rounded-lg focus:shadow-none', inputTextareaClassName)}
        name={name}
        disabled={disabled}
        invalid={invalid}
        value={value}
        ref={ref}
        onChange={(event) => {
          onChange(event)
          externalOnChange?.(event)
        }}
        onBlur={onBlur}
        autoResize
        {...rest}
      />

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
