import { Password, PasswordProps } from 'primereact/password'
import { classNames } from 'primereact/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type PasswordFieldProps<T extends FieldValues> = PasswordProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  inputClassName?: string
  rootClassName?: string
}

export function PasswordField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  rootClassName,
  inputClassName,
  ...rest
}: PasswordFieldProps<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <div className={rootClassName}>
      {label && <label className='mb-1 block w-fit text-sm font-semibold text-white'>{label}</label>}

      <Password
        className='w-full [&>div]:w-full'
        inputClassName={classNames('w-full h-12 rounded-lg focus:shadow-none [&+span]:-mt-3', inputClassName)}
        feedback={false}
        toggleMask
        name={name}
        invalid={invalid}
        value={value}
        ref={ref}
        onChange={(event) => {
          onChange(event)
          externalOnChange?.(event)
        }}
        onBlur={onBlur}
        {...rest}
      />

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
