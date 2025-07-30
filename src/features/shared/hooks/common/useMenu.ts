import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { PrimeIcons } from 'primereact/api'
import { classNames } from 'primereact/utils'

import { RoutePath } from '@/features/shared/constants'

export function useMenu() {
  const { t } = useTranslation('shared')
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const isPathMatched = (pattern: string, exact = false) => {
    const match = matchPath({ path: pattern, end: exact }, currentPath)
    return match !== null
  }

  const menu = [
    {
      key: '0',
      icon: PrimeIcons.USERS,
      href: RoutePath.USERS,
      label: t('shared_menu_user'),
      show: true,
      className: classNames({
        'menu-parent-active': isPathMatched(RoutePath.USERS, false)
      }),
      items: [
        {
          key: '0.1',
          label: t('shared_menu_active_user'),
          href: RoutePath.ACTIVE_USER,
          command: () => navigate([RoutePath.USERS, RoutePath.ACTIVE_USER].join('')),
          className: classNames({
            'menu-item-active': isPathMatched([RoutePath.USERS, RoutePath.ACTIVE_USER].join(''), true)
          })
        },
        {
          key: '0.2',
          label: t('shared_menu_trash_user'),
          href: RoutePath.TRASH_USER,
          command: () => navigate([RoutePath.USERS, RoutePath.TRASH_USER].join('')),
          className: classNames({
            'menu-item-active': isPathMatched([RoutePath.USERS, RoutePath.TRASH_USER].join(''), true)
          })
        }
      ]
    },
    {
      key: '1',
      icon: PrimeIcons.BOX,
      href: RoutePath.PRODUCTS,
      label: t('shared_menu_product'),
      show: true,
      className: classNames({
        'menu-parent-active': isPathMatched(RoutePath.PRODUCTS, false)
      }),
      items: [
        {
          key: '1.1',
          label: t('shared_menu_draft_product'),
          href: RoutePath.DRAFT,
          command: () => navigate([RoutePath.PRODUCTS, RoutePath.DRAFT].join('')),
          className: classNames({
            'menu-item-active': isPathMatched([RoutePath.PRODUCTS, RoutePath.DRAFT].join(''), true)
          })
        },
        {
          key: '1.2',
          label: t('shared_menu_published_product'),
          href: RoutePath.PUBLISHED,
          command: () => navigate([RoutePath.PRODUCTS, RoutePath.PUBLISHED].join('')),
          className: classNames({
            'menu-item-active': isPathMatched([RoutePath.PRODUCTS, RoutePath.PUBLISHED].join(''), true)
          })
        }
      ]
    }
  ]

  return menu.filter((item) => item.show)
}
