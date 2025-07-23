import { Image } from 'primereact/image'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { images } from '@/assets'
import { Logo, Spring } from '@/features/shared/components'

export function AuthLayout() {
  const { t } = useTranslation('shared')

  return (
    <section className='flex min-h-screen flex-col'>
      <div className='grid flex-1 grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]'>
        <div className='hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-[60px]'>
          <Logo imgClass='w-10' textClass='text-3xl font-extrabold' />

          <p className='mx-auto my-7 max-w-[540px] text-center text-lg font-bold leading-6 tracking-[0.2px]'>
            {t('shared_auth_layout_intro')}
          </p>

          <Image className='max-w-[780px]' alt='media' src={images.MEDIA} />
        </div>

        <div className='flex w-full items-center justify-center bg-[var(--bg-auth-layout)] px-4 py-10 lg:p-[60px]'>
          <Spring className='w-full max-w-[460px]' type='slideUp' duration={400} delay={300}>
            <Outlet />
          </Spring>
        </div>
      </div>
    </section>
  )
}
