import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
import { classNames } from 'primereact/utils'
import { useState } from 'react'

import styles from './DCSelectButton.module.scss'

interface DCSelectButtonProps extends SelectButtonProps {}

export function DCSelectButton({ className: externalClassName, ...props }: DCSelectButtonProps) {
  const [value, setValue] = useState(null)

  const className = classNames(styles['select-button'], externalClassName)

  return (
    <SelectButton
      className={className}
      value={value}
      onChange={(e) => setValue(e.value)}
      itemTemplate={(item) => <>{item.label}</>}
      optionLabel='value'
      {...props}
    />
  )
}
