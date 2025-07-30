import { ApiEndpoint } from '@/features/auth/constants'
import { ListResponse, ListResponseInterface, SuccessResponse } from '@/features/shared/models'
import { axiosClient } from '@/features/shared/utils'
import { UserInterface } from '@/features/user/models'

class UserService {
  async getAllActive() {
    const result = await axiosClient.get<SuccessResponse<ListResponseInterface<UserInterface>>>(ApiEndpoint.USER_LIST)

    return new ListResponse<UserInterface>(result.data.metadata)
  }
}

const userServiceInstance = new UserService()

export default userServiceInstance
