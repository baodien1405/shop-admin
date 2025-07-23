import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'

import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { Calendar } from 'primereact/calendar'

import { ListParamsInterface } from '@/features/shared/models'
import { TradingAccountFiltersPayloadInterface } from '@/features/account/models'

interface TradingAccountFiltersProps {
  initialValues?: TradingAccountFiltersPayloadInterface
  onChange?: (payload: Partial<TradingAccountFiltersPayloadInterface> & Partial<ListParamsInterface>) => void
}

export function TradingAccountFilters({ initialValues, onChange }: TradingAccountFiltersProps) {
  const { t } = useTranslation('account')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const defaultDates = useMemo(() => {
    const { fromDate, toDate } = initialValues || {}

    if (fromDate && !toDate) return [new Date(fromDate)]

    if (!fromDate && toDate) return [new Date(toDate)]

    if (fromDate && toDate) return [new Date(fromDate), new Date(toDate)]

    return []
  }, [initialValues])

  const { Field, handleSubmit, state, setFieldValue, reset } = useForm({
    defaultValues: {
      ...initialValues,
      dates: defaultDates
    } as TradingAccountFiltersPayloadInterface,
    onSubmit: ({ value }) => {
      const payload = {
        ...value,
        fromDate: value?.dates?.[0],
        toDate: value?.dates?.[1],
        pageNumber: 1
      }

      delete payload.dates

      onChange?.(payload)
    }
  })

  const isEnabledClearButton =
    state.values?.tenantId?.length > 0 || state.values?.status?.length > 0 || state.values?.dates?.length > 0

  const filterValueList = [
    {
      label: t('account_filter_tenant'),
      show: state.values?.tenantId?.length > 0,
      onRemove: () => {
        setFieldValue('tenantId', '')
        handleSubmit()
      }
    },
    {
      label: t('account_filter_status'),
      show: state.values?.status?.length > 0,
      onRemove: () => {
        setFieldValue('status', [])
        handleSubmit()
      }
    },
    {
      label: t('account_filter_date'),
      show: state.values?.dates?.length > 0,
      onRemove: () => {
        setFieldValue('dates', [])
        handleSubmit()
      }
    }
  ]

  const showedFilterValueList = filterValueList.filter((filter) => filter.show)

  const handleClearFilters = () => {
    if (isEnabledClearButton) {
      reset()
    }
  }

  return (
    <form
      className='flex items-center justify-between gap-8 mb-6 w-full'
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
    >
      <section className='grid grid-cols-2 gap-6 w-full relative'>
        <Field
          name='keyword'
          children={(field) => (
            <div className='p-inputgroup'>
              <InputText
                className='w-2/6'
                type='search'
                placeholder='Search...'
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />

              <Button icon={PrimeIcons.SEARCH} onClick={handleSubmit} />
            </div>
          )}
        />

        <div className='grid grid-cols-2'>
          <div
            className={classNames(
              'px-4 py-3 rounded-md border transition-all',
              'col-start-2 flex items-center justify-between',
              'hover:cursor-pointer hover:border-primary-500 hover:shadow-[0_0_0_3px_var(--primary-50)]',
              {
                'border-primary-500 shadow-[0_0_0_3px_var(--primary-50)]': filtersOpen,
                'border-neutral-100': !filtersOpen
              }
            )}
            onClick={() => setFiltersOpen((prev) => !prev)}
          >
            <div className='flex items-center gap-2'>
              <span className='pi pi-filter text-sm' />

              {!isEnabledClearButton ? (
                <span className='text-base text-neutral-600'>{t('account_filter')}</span>
              ) : (
                <div className='flex items-center gap-1'>
                  {showedFilterValueList.length > 1 ? (
                    <div className='py-0.5 px-2 rounded-full bg-primary-500 text-neutral-0 flex items-center gap-1 hover:bg-primary-700'>
                      <span className='text-sm'>
                        {t('account_filter_selection_message', {
                          selected: showedFilterValueList.length
                        })}
                      </span>
                      <span className='pi pi-times-circle text-[14px] cursor-pointer' onClick={handleClearFilters} />
                    </div>
                  ) : (
                    showedFilterValueList.map((filter) => (
                      <div
                        key={filter.label}
                        className='py-0.5 px-2 rounded-full bg-primary-500 text-neutral-0 flex items-center gap-1 hover:bg-primary-700'
                      >
                        <span className='text-sm max-w-[45px] truncate'>{filter.label}</span>
                        <span className='pi pi-times-circle text-[14px] cursor-pointer' onClick={filter.onRemove} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <span className={`pi ${filtersOpen ? 'pi-chevron-up' : 'pi-chevron-down'} text-sm`} />
          </div>
        </div>

        {filtersOpen && (
          <div
            className={classNames(
              'mt-2 py-3 px-4 w-full rounded-md bg-neutral-0',
              'absolute top-full z-[10]',
              'shadow-[0_2px_12px_0_rgba(37,37,39,0.10)]',
              'flex items-center justify-between gap-6'
            )}
          >
            <div
              className={classNames('text-neutral-400 text-xs font-extrabold px-2 py-1.5 min-w-20', {
                'text-primary-500 cursor-pointer': isEnabledClearButton,
                'cursor-not-allowed': !isEnabledClearButton
              })}
              onClick={handleClearFilters}
            >
              {t('account_remove_all')}
            </div>

            <div className='flex items-center flex-wrap gap-x-3 gap-y-2'>
              <Field
                name='tenantId'
                children={(field) => (
                  <Dropdown
                    name='tenantId'
                    options={[]}
                    optionLabel='label'
                    placeholder='Select a tenant'
                    checkmark
                    showClear
                    loading={false}
                    disabled={false}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />

              <Field
                name='status'
                children={(field) => (
                  <MultiSelect
                    options={[]}
                    placeholder='Select status'
                    maxSelectedLabels={1}
                    filter
                    filterInputAutoFocus={false}
                    panelHeaderTemplate={<div />}
                    showClear
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />

              <Field
                name='dates'
                children={(field) => (
                  <Calendar
                    name='dates'
                    placeholder='From - To'
                    selectionMode='range'
                    hideOnRangeSelection
                    readOnlyInput
                    showButtonBar
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />
            </div>
          </div>
        )}
      </section>
    </form>
  )
}
