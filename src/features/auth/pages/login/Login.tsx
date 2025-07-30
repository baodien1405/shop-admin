import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { LoginForm, SocialButtonGroup } from '@/features/auth/components'
import { RoutePath } from '@/features/shared/constants'
import { useLoginMutation } from '@/features/auth/hooks'
import { LoginPayload } from '@/features/auth/models'
import { ToastService } from '@/features/shared/services'
import { getErrorMessage } from '@/features/shared/utils'

export default function Login() {
  const { t } = useTranslation(['auth', 'shared'])
  const navigate = useNavigate()
  const location = useLocation()

  const { mutateAsync: loginMutateAsync, isPending: isLoginPending } = useLoginMutation()

  const handleLogin = async (payload: LoginPayload) => {
    if (isLoginPending) return

    try {
      await loginMutateAsync(payload)
      const redirectPath = location?.state || RoutePath.USERS
      navigate(redirectPath)
    } catch (error) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: getErrorMessage(error)
      })
    }
  }

  return (
    <>
      <div className='mb-5 flex flex-col gap-2.5 text-center'>
        <h1 className='text-4xl font-extrabold text-neutral-0'>{t('auth_login_title')}</h1>
        <p className='text-base text-neutral-0 opacity-50 m-auto lg:max-w-[300px] 4xl:max-w-[unset]'>
          {t('auth_login_sub_title')}
        </p>
      </div>

      <LoginForm onSubmit={handleLogin} />

      <div className='mt-10'>
        <div className='relative mb-[30px] '>
          <span className='absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-primary-500 opacity-20' />
          <span className='relative z-10 m-auto flex h-[23px] w-11 items-center justify-center bg-[var(--bg-auth-layout)] text-neutral-0'>
            {t('auth_or')}
          </span>
        </div>

        <SocialButtonGroup />

        <div className='mt-9 flex justify-center gap-2.5 leading-none'>
          <p className='text-neutral-0 text-base'>{t('auth_do_not_have_an_account')}</p>
          <Link to={RoutePath.REGISTER} className='text-btn'>
            {t('auth_register')}
          </Link>
        </div>
      </div>
    </>
  )
}
