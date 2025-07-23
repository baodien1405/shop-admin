import { ColumnProps } from 'primereact/column'

import { CompiledTable } from '@/features/shared/components'
import { ListParamsInterface, ListResponse } from '@/features/shared/models'
import { TradingAccountFiltersPayloadInterface, TradingAccountInterface } from '@/features/account/models'

export interface TradingAccountListProps {
  loading: boolean
  data?: ListResponse<TradingAccountInterface>
  onChangePage?: (payload: Partial<TradingAccountFiltersPayloadInterface> & Partial<ListParamsInterface>) => void
}

export function TradingAccountList({
  loading = false,
  data = new ListResponse<TradingAccountInterface>(),
  onChangePage
}: TradingAccountListProps) {
  const { data: dataList, pageNumber, pageSize, totalRecords } = data
  const pageIndex = (pageNumber - 1) * pageSize

  const COLUMNS: ColumnProps[] = [
    {
      field: 'customerId',
      header: 'Customer ID',
      frozen: true,
      alignFrozen: 'left',
      sortable: true
    },
    {
      field: 'fullName',
      header: 'Full Name',
      frozen: true,
      alignFrozen: 'left',
      className: 'border-r border-neutral-100',
      headerClassName: 'border-r border-neutral-100',
      sortable: true,
      body: (data) => (
        <div className='text-sm text-blue-500 cursor-pointer' onClick={() => {}}>
          {data.fullName}
        </div>
      )
    },
    {
      field: 'idNumber',
      header: 'Id Number',
      sortable: true
    },
    {
      field: 'phone',
      header: 'Phone Number',
      sortable: true
    },
    {
      field: 'email',
      header: 'Email',
      sortable: true
    },
    {
      field: 'tenantName',
      header: 'Tenant Name',
      sortable: true
    },
    {
      field: 'createdTime',
      header: 'Created Time',
      sortable: true
    },
    {
      field: 'approvedBy',
      header: 'Approved By',
      sortable: true
    },
    {
      field: 'approvedTime',
      header: 'Approved Time',
      sortable: true
    },
    {
      field: 'saleCode',
      header: 'Sale Code',
      sortable: true
    },
    {
      field: 'lastModifiedBy',
      header: 'Last Modified By',
      sortable: true
    },
    {
      field: 'lastModifiedTime',
      header: 'Last Modified Time',
      sortable: true
    }
  ]

  return (
    <CompiledTable
      value={dataList}
      loading={loading}
      first={pageIndex}
      totalRecords={totalRecords}
      columns={COLUMNS}
      tableStyle={{
        minWidth: 'max-content'
      }}
      scrollable
      paginator
      onPage={(e) => console.log('onPage', e)}
    />
  )
}
