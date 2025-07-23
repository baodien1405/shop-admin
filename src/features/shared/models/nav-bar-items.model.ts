import { JSX } from 'react'

export interface NavbarItemsInterface {
  label?: string
  href: string
  icon?: string
  show?: boolean
  element?: JSX.Element
  command?: () => void
  className?: string
  items?: NavbarItemsInterface[]
}
