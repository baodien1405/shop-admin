import { ApiEndpoint } from '@/features/auth/constants'
import { NotificationInterface } from '@/features/notification/models'
import { SuccessResponse } from '@/features/shared/models'
import { axiosClient } from '@/features/shared/utils'

class NotificationService {
  getAll() {
    return axiosClient.get<SuccessResponse<NotificationInterface[]>>(ApiEndpoint.NOTIFICATION_LIST)
  }
}

const notificationServiceInstance = new NotificationService()

export default notificationServiceInstance
