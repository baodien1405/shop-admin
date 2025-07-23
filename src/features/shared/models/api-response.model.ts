export interface SuccessResponse<Data> {
  status: string
  message: string
  code: number
  metadata: Data
}

export interface ErrorResponse<Data> {
  status: string
  message: string
  data?: Data
}

export type ApiResponse<Data = unknown> = SuccessResponse<Data> | ErrorResponse<Data>
