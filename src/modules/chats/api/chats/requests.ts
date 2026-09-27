import { getFromGreenApi } from '@/shared/api/greenApi'

import { parseChats } from './helpers'
import type { ChatSummary } from './types'

export async function getChats() {
  const chats = await getFromGreenApi<ChatSummary[]>('getChats')

  return parseChats(chats)
}
