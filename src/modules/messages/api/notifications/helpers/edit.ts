import type {
  NotificationBody
} from '@/modules/messages/api/notifications/types'
import type { EditEvent } from '@/modules/messages/model'

export function parseEdit({
  senderData,
  messageData
}: NotificationBody): EditEvent | null {
  if (messageData?.typeMessage !== 'editedMessage') {
    return null
  }

  const idMessage = messageData.editedMessageData?.stanzaId
  const text = messageData.editedMessageData?.textMessage

  const isIncomplete =
    !senderData ||
    !idMessage ||
    !text

  if (isIncomplete) {
    return null
  }

  return {
    type: 'edit',
    chatId: senderData.chatId,
    idMessage,
    text
  }
}
