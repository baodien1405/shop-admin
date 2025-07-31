import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnProps } from 'primereact/column'
import { DataTableStateEvent } from 'primereact/datatable'

import { DiscountInterface } from '@/features/discount/models'
import { ProductFiltersParamsType } from '@/features/product/models'
import { CompiledTable } from '@/features/shared/components'
import { ListResponse } from '@/features/shared/models'

interface DiscountListProps {
  filters?: ProductFiltersParamsType
  loading: boolean
  data?: ListResponse<DiscountInterface>
  onPageChange?: (payload: Partial<ProductFiltersParamsType>) => void
}

export function DiscountList({
  filters,
  loading = false,
  data = new ListResponse<DiscountInterface>(),
  onPageChange = () => {}
}: DiscountListProps) {
  const { t } = useTranslation('discount')
  const [selectedList, setSelectedList] = useState<DiscountInterface[]>([])
  const { items: dataList, pagination } = data

  const renderActions = () => (
    <div className='flex items-center justify-center gap-2'>
      <i className='pi pi-pen-to-square text-yellow-700 cursor-pointer' />
      <i className='pi pi-trash text-red-600 cursor-pointer' />
    </div>
  )

  const getColumns = (): ColumnProps[] => [
    { selectionMode: 'multiple', frozen: true },
    {
      field: '_id',
      header: t('discount_id_column_header'),
      frozen: true,
      alignFrozen: 'left',
      sortable: true
    },
    {
      field: 'discount_name',
      header: t('discount_name_column_header'),
      sortable: true
    },
    {
      field: 'discount_code',
      header: t('discount_code_column_header'),
      sortable: true,
      body: (data) => <code className='bg-gray-100 px-2 py-1 rounded text-xs'>{data.discount_code}</code>
    },
    {
      header: t('discount_actions_column_header'),
      frozen: true,
      alignFrozen: 'right',
      align: 'center',
      body: renderActions
    }
  ]

  const handlePageChange = (event: DataTableStateEvent) => {
    onPageChange({ page: Number(event.page) + 1, limit: event.rows })
  }

  const handleSortChange = (event: DataTableStateEvent) => {
    onPageChange({
      ...filters,
      page: 1,
      limit: filters?.limit || 10,
      sortBy: event.sortField,
      order: event.sortOrder === 1 ? 'asc' : event.sortOrder === -1 ? 'desc' : undefined
    })
  }

  return (
    <CompiledTable
      dataKey='_id'
      loading={loading}
      value={dataList}
      columns={getColumns()}
      first={(pagination.page - 1) * pagination.limit}
      totalRecords={pagination.totalRows}
      rows={pagination.limit}
      paginator={dataList.length > 0}
      sortField={filters?.sortBy}
      sortOrder={filters?.order === 'asc' ? 1 : filters?.order === 'desc' ? -1 : 0}
      selectionMode='checkbox'
      selection={selectedList}
      onPage={handlePageChange}
      onSort={handleSortChange}
      onSelectionChange={(e) => setSelectedList(e.value)}
    />
  )
}
