import { useTranslation } from 'react-i18next'

import { RoutePath } from '@/features/shared/constants'

export const useBreadcrumb = () => {
  const { t } = useTranslation('shared')

  const BREADCRUMB_LABEL_MAP = {
    [RoutePath.APPROVAL_PIPELINES]: t('shared_menu_request_management'),
    [RoutePath.USERS]: t('shared_menu_user'),
    [`${RoutePath.USERS}${RoutePath.ACTIVE_USER}`]: t('shared_menu_active_user'),
    [`${RoutePath.USERS}${RoutePath.TRASH_USER}`]: t('shared_menu_trash_user'),
    [RoutePath.PRODUCTS]: t('shared_menu_product'),
    [`${RoutePath.PRODUCTS}${RoutePath.DRAFT}`]: t('shared_menu_draft_product'),
    [`${RoutePath.PRODUCTS}${RoutePath.PUBLISHED}`]: t('shared_menu_published_product')
  }

  return BREADCRUMB_LABEL_MAP
}
