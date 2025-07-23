import { AutoComplete, AutoCompleteProps } from 'primereact/autocomplete'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type AutoCompleteFieldProps<T extends FieldValues> = AutoCompleteProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  rootClassName?: string
  inputClassName?: string
}

export function AutoCompleteField<T extends FieldValues>({
  name,
  control,
  label,
  rootClassName,
  inputClassName,
  disabled,
  ...rest
}: AutoCompleteFieldProps<T>) {
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

      <AutoComplete
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className='w-full rounded-lg'
        inputClassName={classNames('w-full h-12 px-4 focus:shadow-none', inputClassName)}
        invalid={invalid}
        disabled={disabled}
        {...rest}
      />

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
