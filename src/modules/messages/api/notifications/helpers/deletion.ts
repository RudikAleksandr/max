import type {
  NotificationBody
} from '@/modules/messages/api/notifications/types'
import type { DeletionEvent } from '@/modules/messages/model'

export function parseDeletion({
  senderData,
  messageData
}: NotificationBody): DeletionEvent | null {
  if (messageData?.typeMessage !== 'deletedMessage') {
    return null
  }

  const idMessage = messageData.deletedMessageData?.stanzaId
  const isIncomplete = !senderData || !idMessage

  if (isIncomplete) {
    return null
  }

  return {
    type: 'deletion',
    chatId: senderData.chatId,
    idMessage
  }
}
