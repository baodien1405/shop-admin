import { useTranslation } from 'react-i18next'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'

export function SocialButtonGroup() {
  const { t } = useTranslation('auth')

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xs:gap-[30px]'>
      <Button outlined icon={PrimeIcons.GOOGLE} className='w-full' label={t('auth_google')} />
      <Button outlined icon={PrimeIcons.GITHUB} className='w-full' label={t('auth_github')} />
    </div>
  )
}
