import { TradingAccountActions, TradingAccountFilters, TradingAccountList } from '@/features/account/components'

export default function TradingAccount() {
  return (
    <section className='px-4'>
      <section className='grid grid-cols-2 gap-6 items-center my-6'>
        <h1 className='text-3xl font-extrabold text-neutral-950'>Trading Account</h1>

        <TradingAccountActions isExporting={false} onExport={() => {}} />
      </section>

      <TradingAccountFilters />

      <TradingAccountList loading={false} />
    </section>
  )
}
