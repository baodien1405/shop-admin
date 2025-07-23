import { PaginationInterface } from '@/features/shared/models/pagination.model'

export interface ListResponseInterface<T> {
  items: Array<T>
  pagination: PaginationInterface
}

export class ListResponse<T> implements ListResponseInterface<T> {
  items: Array<T>
  pagination: PaginationInterface

  constructor(
    { items, pagination }: ListResponseInterface<T> = { items: [], pagination: { page: 1, limit: 10, totalRows: 0 } }
  ) {
    this.items = items
    this.pagination = pagination
  }
}
