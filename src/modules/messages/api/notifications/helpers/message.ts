import type { ChatSource } from '@/modules/chats'
import type {
  NotificationBody,
  SenderData
} from '@/modules/messages/api/notifications/types'
import type {
  IncomingEvent,
  Message,
  OutgoingEvent
} from '@/modules/messages/model'
import {
  pickName,
  toMilliseconds,
  toPhoneDigits
} from '@/shared/api/greenApi'

import {
  GROUP_CHAT_TYPES,
  MESSAGE_DIRECTIONS,
  TEXT_EXTRACTORS
} from './constants'

function toChatSource(
  senderData: SenderData,
  direction: Message['direction']
): ChatSource {
  const {
    chatId,
    chatType = 'user',
    chatName,
    senderName,
    senderContactName,
    senderPhoneNumber
  } = senderData

  const isGroupChat = GROUP_CHAT_TYPES.includes(chatType)

  if (isGroupChat) {
    return {
      chatId,
      kind: chatType,
      name: pickName(chatName)
    }
  }

  if (direction === 'out') {
    return {
      chatId,
      kind: chatType
    }
  }

  return {
    chatId,
    kind: chatType,
    name: pickName(senderName, senderContactName),
    phone: toPhoneDigits(senderPhoneNumber)
  }
}

export function parseTextMessage(
  body: NotificationBody
): IncomingEvent | OutgoingEvent | null {
  const direction = MESSAGE_DIRECTIONS[body.typeWebhook]

  if (!direction) {
    return null
  }

  const {
    idMessage,
    senderData,
    messageData
  } = body

  const isIncomplete =
    !idMessage ||
    !senderData ||
    !messageData

  if (isIncomplete) {
    return null
  }

  const text = TEXT_EXTRACTORS[messageData.typeMessage]?.(messageData)

  if (!text) {
    return null
  }

  const chat = toChatSource(senderData, direction)

  const base = {
    id: idMessage,
    chatId: senderData.chatId,
    text,
    timestamp: toMilliseconds(body.timestamp)
  }

  if (direction === 'in') {
    return {
      type: 'incoming',
      chat,
      message: {
        ...base,
        direction
      }
    }
  }

  return {
    type: 'outgoing',
    chat,
    message: {
      ...base,
      direction,
      status: 'sent'
    }
  }
}
