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
      href: RoutePath.ACCOUNTS,
      label: t('shared_menu_account_management'),
      show: true,
      className: classNames({
        'menu-parent-active': isPathMatched(RoutePath.ACCOUNTS, false)
      }),
      items: [
        {
          key: '0.1',
          label: t('shared_menu_trading_account'),
          href: RoutePath.TRADING_ACCOUNT,
          command: () => navigate(`${RoutePath.ACCOUNTS}${RoutePath.TRADING_ACCOUNT}`),
          className: classNames({
            'menu-item-active': isPathMatched(`${RoutePath.ACCOUNTS}${RoutePath.TRADING_ACCOUNT}`, true)
          })
        },
        {
          key: '0.2',
          label: t('shared_menu_unverified_account'),
          href: RoutePath.UNVERIFIED_ACCOUNT,
          command: () => navigate(`${RoutePath.ACCOUNTS}${RoutePath.UNVERIFIED_ACCOUNT}`),
          className: classNames({
            'menu-item-active': isPathMatched(`${RoutePath.ACCOUNTS}${RoutePath.UNVERIFIED_ACCOUNT}`, true)
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
          command: () => navigate(`${RoutePath.PRODUCTS}${RoutePath.DRAFT}`),
          className: classNames({
            'menu-item-active': isPathMatched(`${RoutePath.PRODUCTS}${RoutePath.DRAFT}`, true)
          })
        },
        {
          key: '1.2',
          label: t('shared_menu_published_product'),
          href: RoutePath.PUBLISHED,
          command: () => navigate(`${RoutePath.PRODUCTS}${RoutePath.PUBLISHED}`),
          className: classNames({
            'menu-item-active': isPathMatched(`${RoutePath.PRODUCTS}${RoutePath.PUBLISHED}`, true)
          })
        }
      ]
    }
  ]

  return menu.filter((item) => item.show)
}
