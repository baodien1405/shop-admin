import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'

import styles from './DCDropdown.module.scss'

export type DCDropdownProps = DropdownProps

export function DCDropdown({ className: externalClassName, invalid, ...props }: DCDropdownProps) {
  const className = classNames(
    styles['dropdown'],
    {
      [styles.invalid]: invalid
    },
    externalClassName
  )

  return <Dropdown className={className} {...props} />
}
