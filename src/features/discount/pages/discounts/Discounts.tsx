import { useTranslation } from 'react-i18next'

import { DiscountList, DiscountFilters, DiscountActions, AddEditDiscountDialog } from '@/features/discount/components'
import { useDiscountFilters, useDiscountListQuery } from '@/features/discount/hooks'
import { DiscountFiltersParamsType } from '@/features/discount/models'

export default function Discounts() {
  const { t } = useTranslation('discount')
  const { filters, setFilters } = useDiscountFilters()
  const { data: discountListData, isFetching: isDiscountListFetching } = useDiscountListQuery(filters)

  const handleFiltersChange = (payload: Partial<DiscountFiltersParamsType>) => {
    setFilters({
      ...filters,
      ...payload
    })
  }

  return (
    <section className='px-4'>
      <section className='grid grid-cols-2 gap-6 items-center my-6'>
        <h1 className='text-3xl font-extrabold text-neutral-950'>{t('discount_title')}</h1>

        <DiscountActions />
      </section>

      <DiscountFilters initialValues={filters} onChange={handleFiltersChange} />

      <DiscountList
        filters={filters}
        loading={isDiscountListFetching}
        data={discountListData}
        onPageChange={handleFiltersChange}
      />

      <AddEditDiscountDialog />
    </section>
  )
}
