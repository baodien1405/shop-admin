import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, HttpStatusCode } from 'axios'
import { jwtDecode } from 'jwt-decode'

import i18n from '@/i18n/i18n'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '@/features/auth/utils'
import { ToastService } from '@/features/shared/services'
import { ApiEndpoint } from '@/features/auth/constants'
import { AuthService } from '@/features/auth/services'
import { AuthResponse, User } from '@/features/auth/models'
import { ErrorResponse } from '@/features/shared/models'
import { RequestHeaderKey } from '@/features/shared/constants'
import { isAxiosUnauthorizedError } from '@/features/shared/utils'
import { useAuthStore } from '@/features/auth/stores'

const { setIsAuthenticated } = useAuthStore.getState()

let accessToken = getAccessTokenFromLS()
let refreshToken = getRefreshTokenFromLS()
let refreshTokenRequest: Promise<string> | null = null
let profile = getProfileFromLS() as User | null

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: import.meta.env.VITE_AXIOS_TIMEOUT || 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    if (config.headers) {
      config.headers[RequestHeaderKey.API_KEY] = import.meta.env.VITE_API_KEY
      config.headers[RequestHeaderKey.CLIENT_ID] = profile?._id

      if (accessToken) {
        config.headers[RequestHeaderKey.AUTHORIZATION] = `Bearer ${accessToken}`
      }

      return config
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { url } = response.config
    if (!!url && [ApiEndpoint.LOGIN, ApiEndpoint.REGISTER].includes(url)) {
      const data = response.data as AuthResponse

      profile = data.metadata.shop
      accessToken = data.metadata.accessToken
      refreshToken = data.metadata.refreshToken

      setAccessTokenToLS(accessToken)
      setRefreshTokenToLS(refreshToken)
      setProfileToLS(profile)
      setIsAuthenticated(true)
    } else if (url === ApiEndpoint.LOGOUT) {
      accessToken = ''
      refreshToken = ''
      clearLS()
    }
    return response
  },
  async function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Only toast message if error not 422 and 401
    if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any | undefined = error.response?.data
      const message = data?.message || error.message

      ToastService.error({
        summary: i18n.t('shared_toast_error_summary', { ns: 'shared' }),
        detail: message
      })
    }

    // Error Unauthorized (401) has a lot of cases, ex:
    // - Invalid token
    // - Missing token
    // - Expired token*

    if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
      const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
      const { url } = config
      const decoded = jwtDecode(accessToken) as { exp: number }
      const isExpiredToken = decoded?.exp < new Date().getTime() / 1000
      // In case the token has expired and the request is not a refresh token request,
      // then we proceed to call the refresh token.
      if (isExpiredToken && url !== ApiEndpoint.REFRESH_TOKEN) {
        // Avoid triggering handleRefreshToken multiple times
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : handleRefreshToken().finally(() => {
              // Retain the refreshTokenRequest for 10 seconds to reuse it for subsequent 401 responses
              setTimeout(() => {
                refreshTokenRequest = null
              }, 10000)
            })
        const accessToken = await refreshTokenRequest
        return await axiosClient({
          ...config,
          headers: { ...config.headers, Authorization: accessToken }
        })
      }

      // In cases such as an invalid token,
      // missing token,
      // or token expiration where the refresh token request fails,
      // clear local storage and show a toast message

      clearLS()
      accessToken = ''
      refreshToken = ''
      ToastService.error({
        summary: 'Error',
        detail: error.response?.data.data?.message || error.response?.data.message
      })
    }

    return Promise.reject(error)
  }
)

async function handleRefreshToken() {
  try {
    const res = await AuthService.refreshToken(refreshToken)
    const newAccessToken = res.data.metadata.accessToken
    const newRefetchToken = res.data.metadata.refreshToken

    setAccessTokenToLS(newAccessToken)
    setRefreshTokenToLS(newRefetchToken)

    accessToken = newAccessToken
    refreshToken = newRefetchToken

    return newAccessToken
  } catch (error) {
    clearLS()
    accessToken = ''
    refreshToken = ''
    throw error
  }
}

export default axiosClient
