import { useTranslation } from 'react-i18next'
import { classNames } from 'primereact/utils'
import { Image } from 'primereact/image'

import { Locale } from '@/features/shared/enums'
import { svgs } from '@/assets'

export function SwitchLanguage() {
  const { i18n, t } = useTranslation('shared')

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }

  return (
    <div className='flex gap-1'>
      <div
        onClick={() => handleChangeLanguage(Locale.EN)}
        className={classNames(
          i18n.language === Locale.EN ? 'bg-neutral-100 text-neutral-600' : 'bg-transparent text-gray-400',
          'cursor-pointer px-2 py-1.5 rounded-md border border-transparent text-xs font-extrabold w-fit',
          'flex items-center gap-1.5'
        )}
      >
        <Image src={svgs.FLAG_ENGLISH} />
        <span>{t('shared_switch_language_en')}</span>
      </div>

      <div
        onClick={() => handleChangeLanguage(Locale.VI)}
        className={classNames(
          i18n.language === Locale.VI ? 'bg-neutral-100 text-neutral-600' : 'bg-transparent text-gray-400',
          'cursor-pointer px-2 py-1.5 rounded-md border-transparent text-xs font-extrabold',
          'flex items-center gap-1.5'
        )}
      >
        <Image src={svgs.FLAG_VIETNAM} />
        <span>{t('shared_switch_language_vi')}</span>
      </div>
    </div>
  )
}
