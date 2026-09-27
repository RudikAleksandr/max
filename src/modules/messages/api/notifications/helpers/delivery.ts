import { toDeliveryStatus } from '@/modules/messages/api/messages'
import type {
  NotificationBody
} from '@/modules/messages/api/notifications/types'
import type {
  DeliveryEvent,
  DeliveryUpdate
} from '@/modules/messages/model'

import {
  FAILURE_MESSAGES,
  SUSPENDED_HINT,
  SUSPENDED_PATTERN
} from './constants'

function explainFailure(description: string) {
  return SUSPENDED_PATTERN.test(description)
    ? SUSPENDED_HINT
    : description
}

function toDeliveryUpdate(
  status: string,
  description?: string
): DeliveryUpdate | null {
  const delivered = toDeliveryStatus(status)

  if (delivered) {
    return {
      status: delivered
    }
  }

  const message = FAILURE_MESSAGES[status]

  if (!message) {
    return null
  }

  return {
    status: 'failed',
    error: description
      ? `${message}: ${explainFailure(description)}`
      : message
  }
}

export function parseOutgoingStatus(
  body: NotificationBody
): DeliveryEvent | null {
  if (body.typeWebhook !== 'outgoingMessageStatus') {
    return null
  }

  const {
    chatId,
    idMessage,
    status,
    description
  } = body

  const isIncomplete =
    !chatId ||
    !idMessage ||
    !status

  if (isIncomplete) {
    return null
  }

  const update = toDeliveryUpdate(status, description)

  if (!update) {
    return null
  }

  return {
    type: 'delivery',
    chatId,
    idMessage,
    update
  }
}
