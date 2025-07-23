import { InputText, InputTextProps } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'

import styles from './DCInputText.module.scss'

export type DCInputTextProps = InputTextProps

export function DCInputText({ className: externalClassName, invalid, ...props }: DCInputTextProps) {
  const classNameInputText = classNames(
    styles['input-text'],
    {
      [styles.invalid]: invalid
    },
    externalClassName
  )

  return <InputText className={classNameInputText} {...props} />
}
