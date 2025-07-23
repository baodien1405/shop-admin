import { Tag, TagProps } from 'primereact/tag'
import { classNames } from 'primereact/utils'
import { ReactNode } from 'react'

import styles from './DCTag.module.scss'

interface DCTagProps extends TagProps {
  children?: ReactNode
}

export function DCTag({ className: externalClassName, severity = 'success', children, ...props }: DCTagProps) {
  const className = classNames(
    'py-1 px-2',
    {
      [styles.success]: severity === 'success',
      [styles.warning]: severity === 'warning',
      [styles.danger]: severity === 'danger'
    },
    externalClassName
  )

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  )
}
