import { InputNumber, InputNumberProps } from 'primereact/inputnumber'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type InputNumberFieldProps<T extends FieldValues> = InputNumberProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  inputClassName?: string
  rootClassName?: string
}

export function InputNumberField<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  rootClassName,
  inputClassName,
  ...rest
}: InputNumberFieldProps<T>) {
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

      <InputNumber
        className='w-full h-12 px-4'
        inputClassName={classNames('focus:shadow-none rounded-lg', inputClassName)}
        name={name}
        disabled={disabled}
        invalid={invalid}
        value={value}
        ref={ref}
        onValueChange={onChange}
        onBlur={onBlur}
        {...rest}
      />

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
