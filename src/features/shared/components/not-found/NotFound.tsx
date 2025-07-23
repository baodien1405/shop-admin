import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'

import { Logo } from '@/features/shared/components/logo'
import { images } from '@/assets'

import styles from './NotFound.module.scss'
import { RoutePath } from '@/features/shared/constants'

export function NotFound() {
  const { t } = useTranslation('shared')
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Image imageClassName={styles.media} src={images.COLLAGE_404} alt={t('shared_not_found_404')} />

      <div className={styles.main}>
        <span className='text-[120px] leading-[1.1] font-extrabold'>{t('shared_not_found_404')}</span>
        <h1 className='text-[38px] leading-[1.1] font-extrabold'>{t('shared_not_found_page_not_found')}</h1>
        <Button
          className='w-full max-w-[300px] mt-10'
          label={t('shared_not_found_back_to_home')}
          onClick={() => navigate(RoutePath.HOME)}
        />
      </div>

      <Logo textClass='text-base font-extrabold' />
    </div>
  )
}
