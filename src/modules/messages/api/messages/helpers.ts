import type { Message } from '@/modules/messages/model'
import { toMilliseconds } from '@/shared/api/greenApi'

import {
  DELIVERY_STATUSES,
  TEXT_EXTRACTORS
} from './constants'
import type { HistoryMessage } from './types'

export function toDeliveryStatus(status: string) {
  return DELIVERY_STATUSES[status]
}

function toMessage({
  type,
  idMessage,
  chatId,
  statusMessage = '',
  timestamp,
  isDeleted,
  isEdited
}: HistoryMessage, text: string): Message {
  const base = {
    id: idMessage,
    chatId,
    text,
    timestamp: toMilliseconds(timestamp),
    isDeleted,
    isEdited
  }

  if (type === 'incoming') {
    return {
      ...base,
      direction: 'in'
    }
  }

  return {
    ...base,
    direction: 'out',
    status: toDeliveryStatus(statusMessage) ?? 'sent'
  }
}

function parseMessage(message: HistoryMessage) {
  const text = TEXT_EXTRACTORS[message.typeMessage]?.(message)

  return text
    ? [toMessage(message, text)]
    : []
}

export function parseHistory(history: HistoryMessage[]) {
  return history.flatMap(parseMessage).reverse()
}
