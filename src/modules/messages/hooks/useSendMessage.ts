import { useMutation } from '@tanstack/react-query'

import { sendMessage } from '@/modules/messages/api'
import {
  createOutgoingMessage,
  useMessagesStore
} from '@/modules/messages/model'
import { getGreenApiErrorMessage } from '@/shared/api/greenApi'

interface OutgoingText {
  chatId: string
  text: string
}

interface SendMessageVariables extends OutgoingText {
  localId: string
}

export function useSendMessage() {
  const addMessage = useMessagesStore((state) => state.addMessage)
  const confirmSent = useMessagesStore((state) => state.confirmSent)
  const failSent = useMessagesStore((state) => state.failSent)

  const { mutate } = useMutation({
    mutationFn: ({ chatId, text }: SendMessageVariables) =>
      sendMessage(chatId, text),
    scope: { id: 'sendMessage' },
    onSuccess: (idMessage, { chatId, localId }) => {
      confirmSent({ chatId, localId, idMessage })
    },
    onError: (error, { chatId, localId }) => {
      const errorMessage = getGreenApiErrorMessage(error)

      failSent({
        chatId,
        localId,
        error: errorMessage
      })
    }
  })

  function send({ chatId, text }: OutgoingText) {
    const message = createOutgoingMessage(chatId, text)

    addMessage(message)

    mutate({
      chatId,
      text,
      localId: message.id
    })
  }

  return { send }
}
