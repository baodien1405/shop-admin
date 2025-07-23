import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type InputSwitchFieldProps<T extends FieldValues> = Omit<InputSwitchProps, 'checked'> & {
  name: Path<T>
  control: Control<T>
  label?: string
  inputClassName?: string
  rootClassName?: string
}

export function InputSwitchField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  rootClassName,
  inputClassName,
  ...rest
}: InputSwitchFieldProps<T>) {
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

      <InputSwitch
        name={name}
        invalid={invalid}
        onChange={(event) => {
          onChange(event)
          externalOnChange?.(event)
        }}
        onBlur={onBlur}
        inputRef={ref}
        {...rest}
        checked={value}
      />

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
