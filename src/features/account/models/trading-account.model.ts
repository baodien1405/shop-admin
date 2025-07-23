import { ListParamsInterface } from '@/features/shared/models'

export interface TradingAccountFiltersPayloadInterface {
  tenantId: string
  fromDate?: Date | null
  toDate?: Date | null
  dates?: any
  status: string[]
  keyword: string
}

export type TradingAccountFiltersParamsType = ListParamsInterface & TradingAccountFiltersPayloadInterface

export interface TradingAccountInterface {
  id: string
  customerId: string
  fullName: string
  idNumber: string
  phoneNumber: string
  email: string
  investorId: string
  status: string
  createdAt: Date
  updatedAt: Date
}
