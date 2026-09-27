import type { ChatSource } from '@/modules/chats/model'
import {
  pickName,
  toPhoneDigits
} from '@/shared/api/greenApi'

import type { ChatSummary } from './types'

export function parseChats(summaries: ChatSummary[]): ChatSource[] {
  return summaries.map(({ chatId, type, name, phoneNumber }) => ({
    chatId,
    kind: type,
    name: pickName(name),
    phone: toPhoneDigits(phoneNumber)
  }))
}
