import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type DropdownFieldProps<T extends FieldValues> = DropdownProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  rootClassName?: string
  dropdownClassName?: string
}

export function DropdownField<T extends FieldValues>({
  name,
  control,
  label,
  rootClassName,
  dropdownClassName,
  disabled,
  ...rest
}: DropdownFieldProps<T>) {
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

      <Dropdown
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('w-full h-12 shadow-none', dropdownClassName)}
        invalid={invalid}
        disabled={disabled}
        {...rest}
      />

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
