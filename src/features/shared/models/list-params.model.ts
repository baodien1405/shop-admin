export interface ListParamsInterface {
  page: number
  limit: number
}

export class ListParams implements ListParamsInterface {
  page: number
  limit: number

  constructor(option: ListParamsInterface = { page: 1, limit: 10 }) {
    this.page = option.page
    this.limit = option.limit
  }
}
