import { ApiEndpoint } from '@/features/auth/constants'
import { AuthResponse, LoginPayload, RegisterPayload } from '@/features/auth/models'
import { RequestHeaderKey } from '@/features/shared/constants'
import { SuccessResponse } from '@/features/shared/models'
import { axiosClient } from '@/features/shared/utils'

class AuthService {
  login(body: LoginPayload) {
    return axiosClient.post<AuthResponse>(ApiEndpoint.LOGIN, body)
  }

  register(body: RegisterPayload) {
    return axiosClient.post<AuthResponse>(ApiEndpoint.REGISTER, body)
  }

  logout() {
    return axiosClient.post<SuccessResponse<string>>(ApiEndpoint.LOGOUT)
  }

  refreshToken(refreshToken: string) {
    return axiosClient.post<AuthResponse>(
      ApiEndpoint.REFRESH_TOKEN,
      {},
      {
        headers: {
          [RequestHeaderKey.REFRESH_TOKEN]: refreshToken
        }
      }
    )
  }
}

const authServiceInstance = new AuthService()

export default authServiceInstance
