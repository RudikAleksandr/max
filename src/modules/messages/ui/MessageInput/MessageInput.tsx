import { zodResolver } from '@hookform/resolvers/zod'
import type { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { useSendMessage } from '@/modules/messages/hooks'
import {
  MAX_MESSAGE_LENGTH,
  type MessageFormValues,
  messageSchema
} from '@/modules/messages/model'
import SendIcon from '@/shared/assets/icons/send.svg?react'
import {
  Button,
  Textarea
} from '@/shared/ui'

import styles from './MessageInput.module.scss'

interface MessageInputProps {
  chatId: string
  hidden: boolean
}

export function MessageInput({ chatId, hidden }: MessageInputProps) {
  const { send } = useSendMessage()

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid }
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: ''
    }
  })

  function onSubmit({ text }: MessageFormValues) {
    send({ chatId, text })

    resetField('text')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const isSendKey =
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing

    if (!isSendKey) {
      return
    }

    event.preventDefault()
    event.currentTarget.form?.requestSubmit()
  }

  return (
    <form
      className={styles.form}
      inert={hidden}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        placeholder="Сообщение"
        maxLength={MAX_MESSAGE_LENGTH}
        autoFocus
        onKeyDown={handleKeyDown}
        {...register('text')}
      />
      <Button
        type="submit"
        variant="icon"
        className={styles.send}
        aria-label="Отправить"
        disabled={!isValid}
      >
        <SendIcon />
      </Button>
    </form>
  )
}
