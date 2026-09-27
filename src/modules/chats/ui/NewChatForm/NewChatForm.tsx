import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import {
  useController,
  useForm
} from 'react-hook-form'

import { useAddChat } from '@/modules/chats/hooks'
import { toInternationalPhone } from '@/modules/chats/lib'
import {
  type NewChatFormValues,
  newChatSchema
} from '@/modules/chats/model'
import {
  Button,
  PhoneInput
} from '@/shared/ui'

import {
  BLOCKING_ERROR,
  DEFAULT_COUNTRY,
  PHONE_COUNTRIES,
  RETRYABLE_ERROR
} from './constants'
import styles from './NewChatForm.module.scss'

interface NewChatFormProps {
  onOpenChat: (chatId: string) => void
}

export function NewChatForm({ onOpenChat }: NewChatFormProps) {
  const { addChatByPhone, isPending } = useAddChat()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    resolver: zodResolver(newChatSchema),
    defaultValues: {
      phone: ''
    }
  })

  const { field } = useController({
    control,
    name: 'phone'
  })

  const phoneErrorType = errors.phone?.type

  const hasBlockingError =
    Boolean(phoneErrorType) && phoneErrorType !== RETRYABLE_ERROR

  const submitText = isPending
    ? 'Проверяем номер'
    : 'Создать чат'

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  async function onSubmit({ phone }: NewChatFormValues) {
    const result = await addChatByPhone(phone)

    if ('error' in result) {
      setError('phone', {
        type: result.canRetry
          ? RETRYABLE_ERROR
          : BLOCKING_ERROR,
        message: result.error
      })

      return
    }

    onOpenChat(result.chatId)
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <PhoneInput
        label="Новый чат"
        countries={PHONE_COUNTRIES}
        defaultCountry={DEFAULT_COUNTRY}
        toInternational={toInternationalPhone}
        error={errors.phone?.message}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
      />
      <Button
        type="submit"
        loading={isPending}
        disabled={hasBlockingError}
      >
        {submitText}
      </Button>
    </form>
  )
}
