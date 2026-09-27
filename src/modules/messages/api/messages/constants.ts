import type { OutgoingStatus } from '@/modules/messages/model'

import type { HistoryMessage } from './types'

export const HISTORY_COUNT = 100

export const DELIVERY_STATUSES: Record<string, OutgoingStatus> = {
  sent: 'sent',
  delivered: 'delivered',
  read: 'read'
}

export const TEXT_EXTRACTORS: Record<
  string,
  (message: HistoryMessage) => string | undefined
> = {
  textMessage: ({ textMessage }) => textMessage,
  extendedTextMessage: ({ textMessage }) => textMessage,
  quotedMessage: ({ extendedTextMessage }) => extendedTextMessage?.text,
  buttonsMessage: ({ buttonsMessage }) => buttonsMessage?.contentText
}
