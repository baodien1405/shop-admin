import { Pagination, PaginationInterface } from '@/features/shared/models'

export const useClientPagination = <T>({
  data = [],
  pagination = new Pagination()
}: {
  data: T[]
  pagination: PaginationInterface
}) => {
  const paginatedData = data.slice(
    (pagination.pageNumber - 1) * pagination.pageSize,
    pagination.pageNumber * pagination.pageSize
  )

  return paginatedData
}
