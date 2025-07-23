import { SuccessResponse } from '@/features/shared/models'

type Role = 'USER' | 'ADMIN'

export interface AuthPayload {
  name: string
  email: string
  password: string
}

export type LoginPayload = Pick<AuthPayload, 'email' | 'password'>
export type RegisterPayload = Pick<AuthPayload, 'email' | 'name' | 'password'>

export interface User {
  _id: string
  name: string
  email: string
  roles: Role[]
  isAdmin?: string
  phone?: string
  address?: string
  avatar?: string
}

export type AuthResponse = SuccessResponse<{
  shop: User
  accessToken: string
  refreshToken: string
}>
