import { useChatsStore } from './store'
import type { ChatSource } from './types'

export function upsertChat(source: ChatSource) {
  useChatsStore.getState().learnChat(source)
}
