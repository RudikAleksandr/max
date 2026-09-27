import type {
  NotificationBody
} from '@/modules/messages/api/notifications/types'

import { parseDeletion } from './deletion'
import { parseOutgoingStatus } from './delivery'
import { parseEdit } from './edit'
import { parseTextMessage } from './message'

export function parseNotification(body: NotificationBody) {
  return parseTextMessage(body) ??
    parseEdit(body) ??
    parseDeletion(body) ??
    parseOutgoingStatus(body)
}
