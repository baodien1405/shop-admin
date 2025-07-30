import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnProps } from 'primereact/column'
// import { confirmDialog } from 'primereact/confirmdialog'
import { DataTableStateEvent } from 'primereact/datatable'

import { CompiledTable } from '@/features/shared/components'
import { ListResponse } from '@/features/shared/models'
import { ActiveUserFiltersParamsType, UserInterface } from '@/features/user/models'

interface ActiveUserListProps {
  filters?: ActiveUserFiltersParamsType
  loading: boolean
  data?: ListResponse<UserInterface>
  onPageChange?: (payload: Partial<ActiveUserFiltersParamsType>) => void
}

export function ActiveUserList({
  filters,
  loading = false,
  data = new ListResponse<UserInterface>(),
  onPageChange = () => {}
}: ActiveUserListProps) {
  const { t } = useTranslation('product')
  const [selectedList, setSelectedList] = useState<UserInterface[]>([])
  const { items: dataList, pagination } = data

  const renderActions = () => (
    <div className='flex items-center justify-between gap-2'>
      <i className='pi pi-pen-to-square text-yellow-700 cursor-pointer' />
      <i className='pi pi-trash text-red-600 cursor-pointer' />
    </div>
  )

  const getColumns = (): ColumnProps[] => [
    { selectionMode: 'multiple', frozen: true },
    {
      field: '_id',
      header: t('product_id_column_header'),
      frozen: true,
      alignFrozen: 'left',
      sortable: true
    },
    {
      field: 'product_name',
      header: t('product_name_column_header'),
      sortable: true
    },
    {
      field: 'product_description',
      header: t('product_description_column_header'),
      sortable: true,
      body: (data) => <div className='max-w-72 truncate'>{data.product_description}</div>
    },
    {
      field: 'product_price',
      header: t('product_price_column_header'),
      sortable: true
    },
    {
      field: 'product_quantity',
      header: t('product_quantity_column_header'),
      sortable: true
    },
    {
      field: 'product_type',
      header: t('product_type_column_header'),
      sortable: true
    },
    {
      field: 'product_ratingsAverage',
      header: t('product_rating_average_column_header'),
      sortable: true
    },
    {
      header: t('product_actions_column_header'),
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
