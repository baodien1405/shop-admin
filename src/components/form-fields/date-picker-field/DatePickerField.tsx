import { useRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { addLocale } from 'primereact/api'
import { Calendar, CalendarProps } from 'primereact/calendar'
import { classNames } from 'primereact/utils'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { VN_LOCALE_OPTIONS } from '@/features/shared/constants'

addLocale('vn', VN_LOCALE_OPTIONS)

export type DatePickerFieldProps<T extends FieldValues> = CalendarProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  inputClassName?: string
  rootClassName?: string
}

export function DatePickerField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  rootClassName,
  inputClassName,
  ...rest
}: DatePickerFieldProps<T>) {
  const calendarRef = useRef<Calendar>(null)
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

      <IconField>
        <Calendar
          ref={calendarRef}
          className='w-full h-12 rounded-lg'
          inputClassName={classNames('shadow-none px-4', inputClassName)}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          invalid={invalid}
          {...rest}
        />

        <InputIcon className='pi pi-calendar' onClick={() => calendarRef.current?.show()} />
      </IconField>

      {error?.message && <p className='my-2 text-start text-xs text-red-500'>{error.message}</p>}
    </div>
  )
}
