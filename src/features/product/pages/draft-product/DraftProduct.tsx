import { useTranslation } from 'react-i18next'

import {
  AddEditProductDialog,
  DraftProductActions,
  DraftProductFilters,
  DraftProductList
} from '@/features/product/components'
import { useDraftProductFilters, useDraftProductListQuery } from '@/features/product/hooks'
import { ProductFiltersParamsType } from '@/features/product/models'

export default function DraftProduct() {
  const { t } = useTranslation('product')
  const { filters, setFilters } = useDraftProductFilters()
  const { data: draftProductListData, isFetching: isLoadingDraftProductList } = useDraftProductListQuery(filters)

  const handleFiltersChange = (payload: Partial<ProductFiltersParamsType>) => {
    setFilters({
      ...filters,
      ...payload
    })
  }

  return (
    <section className='px-4'>
      <section className='grid grid-cols-2 gap-6 items-center my-6'>
        <h1 className='text-3xl font-extrabold text-neutral-950'>{t('product_draft_title')}</h1>

        <DraftProductActions isExporting={false} onExport={() => {}} />
      </section>

      <DraftProductFilters initialValues={filters} onChange={handleFiltersChange} />

      <DraftProductList
        loading={isLoadingDraftProductList}
        data={draftProductListData}
        onPageChange={handleFiltersChange}
      />

      <AddEditProductDialog />
    </section>
  )
}
