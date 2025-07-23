import { useForm } from '@tanstack/react-form'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

import { AuthPayload, LoginPayload } from '@/features/auth/models'
import { useAuthSchema } from '@/features/auth/hooks'
import { FormField } from '@/features/shared/components'
import { RoutePath } from '@/features/shared/constants'

interface LoginFormProps {
  initialValues?: Partial<AuthPayload>
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const { t } = useTranslation('auth')
  const loginSchema = useAuthSchema()
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      ...initialValues
    },
    validators: {
      onSubmit: loginSchema.pick({ email: true, password: true })
    },
    onSubmit: async ({ value }) => {
      await onSubmit?.(value)
    }
  })

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
    >
      <div className='flex flex-col gap-6'>
        <Field
          name='email'
          children={(field) => (
            <FormField>
              <FormField.Label>{t('auth_email_label')}</FormField.Label>
              <InputText
                autoComplete='username'
                placeholder={t('auth_email_placeholder')}
                className='w-full'
                invalid={!!field.state.meta.errors.length}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FormField.Message field={field} />
            </FormField>
          )}
        />

        <Field
          name='password'
          children={(field) => (
            <FormField>
              <FormField.Label>{t('auth_password_label')}</FormField.Label>
              <Password
                autoComplete='current-password'
                placeholder={t('auth_password_placeholder')}
                className='w-full [&>div]:w-full'
                inputClassName='w-full h-12 rounded-lg focus:shadow-none [&+span]:-mt-3'
                feedback={false}
                toggleMask
                invalid={!!field.state.meta.errors.length}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FormField.Message field={field} />
            </FormField>
          )}
        />
      </div>

      <div className='mb-10 mt-4 flex flex-col items-center gap-6'>
        <Link to={RoutePath.FORGOT_PASSWORD} className='text-btn'>
          {t('auth_forgot_password')}
        </Link>

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              className='w-full'
              disabled={!canSubmit}
              loading={isSubmitting}
              label={t('auth_login')}
            />
          )}
        />
      </div>
    </form>
  )
}
