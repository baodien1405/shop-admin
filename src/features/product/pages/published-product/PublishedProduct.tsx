import { useTranslation } from 'react-i18next'

import {
  AddEditProductDialog,
  PublishedProductActions,
  PublishedProductFilters,
  PublishedProductList
} from '@/features/product/components'
import { usePublishedProductFilters, usePublishedProductListQuery } from '@/features/product/hooks'

export default function PublishedProduct() {
  const { t } = useTranslation('product')
  const { filters } = usePublishedProductFilters()
  const { data: publishedProductListData, isFetching: isLoadingPublishedProductList } =
    usePublishedProductListQuery(filters)

  return (
    <section className='px-4'>
      <section className='grid grid-cols-2 gap-6 items-center my-6'>
        <h1 className='text-3xl font-extrabold text-neutral-950'>{t('product_published_title')}</h1>

        <PublishedProductActions isExporting={false} onExport={() => {}} />
      </section>

      <PublishedProductFilters />

      <PublishedProductList loading={isLoadingPublishedProductList} data={publishedProductListData} />

      <AddEditProductDialog />
    </section>
  )
}
