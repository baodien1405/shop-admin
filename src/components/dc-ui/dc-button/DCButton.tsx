import { Button, ButtonProps } from 'primereact/button'
import { classNames } from 'primereact/utils'

import styles from './DCButton.module.scss'

interface DCButtonProps extends ButtonProps {}

export function DCButton({ size, severity, outlined, text, className: externalClassName, ...props }: DCButtonProps) {
  const classNameBtn = classNames(
    {
      [styles.primary]: severity === undefined,
      [styles.secondary]: severity === 'secondary',
      [styles.success]: severity === 'success',
      [styles.info]: severity === 'info',
      [styles.warning]: severity === 'warning',
      [styles.help]: severity === 'help',
      [styles.danger]: severity === 'danger',

      [styles.outlined]: outlined,
      [styles.text]: text,

      [styles.small]: size === 'small',
      [styles.medium]: size === undefined,
      [styles.large]: size === 'large'
    },
    externalClassName
  )

  return <Button className={classNameBtn} {...props} />
}
