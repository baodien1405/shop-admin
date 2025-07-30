import { ActiveUserActions, ActiveUserFilters, ActiveUserList } from '@/features/user/components'

export default function ActiveUser() {
  return (
    <section className='px-4'>
      <section className='grid grid-cols-2 gap-6 items-center my-6'>
        <h1 className='text-3xl font-extrabold text-neutral-950'>Active User</h1>

        <ActiveUserActions isExporting={false} onExport={() => {}} />
      </section>

      <ActiveUserFilters />

      <ActiveUserList loading={false} />
    </section>
  )
}
