import { useTranslation } from 'react-i18next'

import { RoutePath } from '@/features/shared/constants'

export const useBreadcrumb = () => {
  const { t } = useTranslation('shared')

  const BREADCRUMB_LABEL_MAP = {
    [RoutePath.APPROVAL_PIPELINES]: t('shared_menu_request_management'),
    [RoutePath.ACCOUNTS]: t('shared_menu_account_management'),
    [`${RoutePath.ACCOUNTS}${RoutePath.TRADING_ACCOUNT}`]: t('shared_menu_trading_account'),
    [`${RoutePath.ACCOUNTS}${RoutePath.UNVERIFIED_ACCOUNT}`]: t('shared_menu_unverified_account'),
    [RoutePath.PRODUCTS]: t('shared_menu_product'),
    [`${RoutePath.PRODUCTS}${RoutePath.DRAFT}`]: t('shared_menu_draft_product'),
    [`${RoutePath.PRODUCTS}${RoutePath.PUBLISHED}`]: t('shared_menu_published_product')
  }

  return BREADCRUMB_LABEL_MAP
}
