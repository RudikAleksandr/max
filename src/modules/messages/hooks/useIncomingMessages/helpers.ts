import { upsertChat } from '@/modules/chats'
import {
  type NotificationEvent,
  useMessagesStore
} from '@/modules/messages/model'
import {
  hasStatus,
  HTTP_STATUS
} from '@/shared/api/http'

import {
  DELAYED_MESSAGE,
  INCOMING_DISABLED_MESSAGE,
  WEBHOOK_CONFLICT_MESSAGE
} from './constants'

export function isWebhookConflict(error: unknown) {
  return hasStatus(error, HTTP_STATUS.BAD_REQUEST)
}

export function getReceiveErrorMessage(
  error: Error | null,
  isIncomingEnabled: boolean
) {
  if (error) {
    return isWebhookConflict(error)
      ? WEBHOOK_CONFLICT_MESSAGE
      : DELAYED_MESSAGE
  }

  return isIncomingEnabled
    ? null
    : INCOMING_DISABLED_MESSAGE
}

export function applyNotification(event: NotificationEvent) {
  const {
    addMessage,
    addSentMessage,
    markDeleted,
    recordEdit,
    recordStatus
  } = useMessagesStore.getState()

  if (event.type === 'delivery') {
    recordStatus(event)

    return
  }

  if (event.type === 'deletion') {
    markDeleted(event)

    return
  }

  if (event.type === 'edit') {
    recordEdit(event)

    return
  }

  const { type, chat, message } = event

  upsertChat(chat)

  if (type === 'outgoing') {
    addSentMessage(message)

    return
  }

  addMessage(message)
}
