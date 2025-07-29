import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { NotificationQueryKeys } from '@/features/notification/constants'
import { NotificationService } from '@/features/notification/services'

export const useNotificationListQuery = () => {
  const { i18n } = useTranslation()

  const { data, error, isError, ...restQuery } = useQuery({
    queryKey: [NotificationQueryKeys.NOTIFICATION_LIST, i18n.language],
    queryFn: () => NotificationService.getAll()
  })

  return {
    data: isError ? undefined : data,
    error,
    isError,
    ...restQuery
  }
}
