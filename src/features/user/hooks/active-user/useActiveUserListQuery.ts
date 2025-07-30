import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { UserService } from '@/features/user/services'
import { UserQueryKeys } from '@/features/user/constants'

export const useActiveUserListQuery = () => {
  const { i18n } = useTranslation()

  const { data, error, isError, ...restQuery } = useQuery({
    queryKey: [UserQueryKeys.ACTIVE_USER_LIST, i18n.language],
    queryFn: () => UserService.getAllActive()
  })

  return {
    data: isError ? undefined : data,
    error,
    isError,
    ...restQuery
  }
}
