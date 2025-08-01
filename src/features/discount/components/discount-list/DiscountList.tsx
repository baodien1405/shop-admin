import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { ColumnProps } from 'primereact/column'
import { DataTableStateEvent } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { PrimeIcons } from 'primereact/api'
import { classNames } from 'primereact/utils'

import { DiscountInterface } from '@/features/discount/models'
import { ProductFiltersParamsType } from '@/features/product/models'
import { CompiledTable } from '@/features/shared/components'
import { ListResponse } from '@/features/shared/models'
import { DiscountTypeEnum } from '@/features/discount/enums'
import { DISCOUNT_TYPE_OPTIONS_MAP } from '@/features/discount/constants'
import { formatAmount } from '@/features/shared/utils'

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
  const { t, i18n } = useTranslation('discount')
  const [selectedList, setSelectedList] = useState<DiscountInterface[]>([])
  const { items: dataList, pagination } = data

  const renderDiscountValue = (data: DiscountInterface) => {
    const discountValueMap = {
      [DiscountTypeEnum.PERCENTAGE]: `${data.discount_value}%`,
      [DiscountTypeEnum.FIXED_AMOUNT]: formatAmount(data.discount_value, {
        locales: i18n.language,
        currency: 'VND',
        maximumFractionDigits: 0
      })
    }

    return discountValueMap[data.discount_type] ?? data.discount_value
  }

  const renderStatus = (data: DiscountInterface) => {
    const statusLabel = data.discount_is_active ? t('discount_status_active') : t('discount_status_inactive')

    return (
      <Tag
        icon={data.discount_is_active ? PrimeIcons.CHECK : PrimeIcons.TIMES_CIRCLE}
        value={statusLabel}
        className={classNames('text-center h-6 border font-semibold [&_.p-tag-value]:text-xs', {
          'border-green-700 text-green-700 bg-green-25': data.discount_is_active,
          'border-red-700 text-red-700 bg-red-25': !data.discount_is_active
        })}
      />
    )
  }

  const renderValidity = (data: DiscountInterface) => {
    const startDate = dayjs(data.discount_start_date).format('MM/DD/YYYY HH:mm:ss')
    const endDate = dayjs(data.discount_end_date).format('MM/DD/YYYY HH:mm:ss')

    return `${startDate} - ${endDate}`
  }

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
      field: 'discount_description',
      header: t('discount_description_column_header'),
      sortable: true,
      body: (data) => <div className='max-w-72 truncate'>{data.discount_description}</div>
    },
    {
      field: 'discount_code',
      header: t('discount_code_column_header'),
      sortable: true,
      body: (data) => <code className='bg-gray-100 px-2 py-1 rounded text-xs'>{data.discount_code}</code>
    },
    {
      field: 'discount_type',
      header: t('discount_type_column_header'),
      sortable: true,
      body: (data: DiscountInterface) => <span>{DISCOUNT_TYPE_OPTIONS_MAP[data.discount_type]}</span>
    },
    {
      field: 'discount_value',
      header: t('discount_value_column_header'),
      sortable: true,
      body: renderDiscountValue
    },
    {
      header: t('discount_usage_column_header'),
      body: (data: DiscountInterface) => (
        <span>
          {data.discount_uses_count} / {data.discount_max_uses}
        </span>
      )
    },
    {
      field: 'discount_max_uses_per_user',
      header: t('discount_max_uses_per_user_column_header'),
      sortable: true
    },
    {
      field: 'discount_min_order_value',
      header: t('discount_min_order_value_column_header'),
      sortable: true,
      body: (data: DiscountInterface) =>
        formatAmount(data.discount_min_order_value, {
          locales: i18n.language,
          currency: 'VND',
          maximumFractionDigits: 0
        })
    },
    {
      field: 'discount_max_value',
      header: t('discount_max_value_column_header'),
      sortable: true,
      body: (data: DiscountInterface) =>
        formatAmount(data.discount_max_value, {
          locales: i18n.language,
          currency: 'VND',
          maximumFractionDigits: 0
        })
    },
    {
      field: 'discount_status',
      header: t('discount_status_column_header'),
      sortable: true,
      body: renderStatus
    },
    {
      header: t('discount_validity_column_header'),
      body: renderValidity
    },
    {
      field: 'createdAt',
      header: t('discount_created_at_column_header'),
      sortable: true,
      body: (data) => dayjs(data.createdAt).format('MM/DD/YYYY HH:mm:ss')
    },
    {
      field: 'updatedAt',
      header: t('discount_updated_at_column_header'),
      sortable: true,
      body: (data) => dayjs(data.updatedAt).format('MM/DD/YYYY HH:mm:ss')
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
