import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useLogin } from '@/modules/auth/hooks'
import {
  type LoginFormValues,
  loginSchema,
  useCredentialsStore
} from '@/modules/auth/model'
import {
  Banner,
  Button,
  Input
} from '@/shared/ui'

import styles from './LoginForm.module.scss'
import {
  sanitizeIdInstance,
  sanitizeToken
} from './utils'

export function LoginForm() {
  const logoutReason = useCredentialsStore(({ error }) => error)
  const { login, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  async function onSubmit(values: LoginFormValues) {
    const loginError = await login(values)

    if (loginError) {
      setError('root', {
        message: loginError
      })
    }
  }

  const bannerMessage = isPending
    ? null
    : (errors.root?.message ?? logoutReason)

  const hasFieldErrors = 'idInstance' in errors || 'apiTokenInstance' in errors

  const submitText = isPending ? 'Проверяем данные' : 'Войти'

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {bannerMessage && (
        <Banner>
          {bannerMessage}
        </Banner>
      )}
      <Input
        label="idInstance"
        placeholder="1101000001"
        inputMode="numeric"
        sanitize={sanitizeIdInstance}
        error={errors.idInstance?.message}
        {...register('idInstance')}
      />
      <Input
        label="apiTokenInstance"
        type="password"
        sanitize={sanitizeToken}
        error={errors.apiTokenInstance?.message}
        {...register('apiTokenInstance')}
      />
      <Button
        type="submit"
        size="medium"
        loading={isPending}
        disabled={hasFieldErrors}
      >
        {submitText}
      </Button>
    </form>
  )
}
