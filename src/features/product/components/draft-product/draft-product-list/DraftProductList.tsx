import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'

import { ColumnProps } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTableStateEvent } from 'primereact/datatable'

import { CompiledTable } from '@/features/shared/components'
import { ListResponse } from '@/features/shared/models'
import { ProductFiltersParamsType, ProductInterface } from '@/features/product/models'
import { useAddEditProductDialogStore } from '@/features/product/stores'
import { useDeleteProductMutation } from '@/features/product/hooks'
import { ToastService } from '@/features/shared/services'
import { getErrorMessage } from '@/features/shared/utils'
import { ProductQueryKeys } from '@/features/product/constants'

interface DraftProductListProps {
  filters?: ProductFiltersParamsType
  loading: boolean
  data?: ListResponse<ProductInterface>
  onPageChange?: (payload: Partial<ProductFiltersParamsType>) => void
}

export function DraftProductList({
  filters,
  loading = false,
  data = new ListResponse<ProductInterface>(),
  onPageChange = () => {}
}: DraftProductListProps) {
  const { t } = useTranslation('product')
  const queryClient = useQueryClient()
  const setSelectedProduct = useAddEditProductDialogStore((state) => state.setSelectedProduct)
  const { mutateAsync: deleteProductMutateAsync, isPending: isDeleteProductPending } = useDeleteProductMutation()
  const { items: dataList, pagination } = data

  const renderActions = (product: ProductInterface) => (
    <div className='flex items-center justify-between gap-2'>
      <i
        className='pi pi-pen-to-square text-yellow-700 cursor-pointer'
        onClick={() =>
          setSelectedProduct({
            ...product,
            isDraft: true,
            isPublished: false
          })
        }
      />
      <i
        className='pi pi-trash text-red-600 cursor-pointer'
        onClick={() =>
          confirmDialog({
            message: t('product_confirm_remove_product_message', { productName: product.product_name }),
            header: product.product_name,
            accept: () => handleProductDelete(product._id),
            acceptClassName: 'bg-red-600 mr-0 col-start-4 col-end-6 h-9 text-sm'
          })
        }
      />
    </div>
  )

  const getColumns = (): ColumnProps[] => [
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

  const handleProductDelete = async (productId: string) => {
    if (!productId || isDeleteProductPending) return

    try {
      const response = await deleteProductMutateAsync(productId)

      ToastService.success({
        summary: t('shared_toast_success_summary', { ns: 'shared' }),
        detail: response?.data?.message
      })

      queryClient.invalidateQueries({
        queryKey: [ProductQueryKeys.DRAFT_PRODUCT_LIST]
      })
    } catch (error) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: getErrorMessage(error)
      })
    }
  }

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
      onPage={handlePageChange}
      onSort={handleSortChange}
    />
  )
}
