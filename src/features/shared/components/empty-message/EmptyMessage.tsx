import { useTranslation } from 'react-i18next'
import { Image } from 'primereact/image'

import { images } from '@/assets'

export function EmptyMessage() {
  const { t } = useTranslation('shared')

  return (
    <div className='text-center'>
      <Image src={images.EMPTY_MESSAGE} className='mb-4 mx-auto flex items-center justify-center w-20 h-20' />

      <p className='text-xl text-neutral-950 font-extrabold mb-1'>{t('shared_table_empty_message_title')}</p>

      <p className='text-neutral-600 text-base'>{t('shared_table_empty_message_description')}</p>
    </div>
  )
}
