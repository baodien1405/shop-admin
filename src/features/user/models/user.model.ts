import { ListParamsInterface } from '@/features/shared/models'

type Role = 'USER' | 'ADMIN' | '0001' | '0002'

export interface ActiveUserFiltersPayloadInterface {
  keyword: string
  sortBy?: string
  order?: string
}

export type ActiveUserFiltersParamsType = ListParamsInterface & ActiveUserFiltersPayloadInterface

export interface UserInterface {
  _id: string
  name: string
  email: string
  roles: Role[]
  isAdmin?: string
  phone?: string
  address?: string
  avatar?: string
}
