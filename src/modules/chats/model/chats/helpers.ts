import { displayPhone } from '@/modules/chats/lib'

import { SAVED_TITLE } from './constants'
import type {
  Chat,
  ChatSource
} from './types'

function getChatTitle({
  chatId,
  kind,
  name,
  phone
}: ChatSource) {
  if (kind === 'saved') {
    return SAVED_TITLE
  }

  if (name) {
    return name
  }

  if (phone) {
    return displayPhone(phone)
  }

  return chatId
}

function createChat(source: ChatSource): Chat {
  return {
    chatId: source.chatId,
    kind: source.kind ?? 'user',
    phone: source.phone,
    title: getChatTitle(source)
  }
}

export function markSavedChat(
  sources: ChatSource[],
  accountChatId?: string
): ChatSource[] {
  if (!accountChatId) {
    return sources
  }

  return sources.map((source) => {
    const kind = source.chatId === accountChatId
      ? 'saved'
      : source.kind

    return {
      ...source,
      kind
    }
  })
}

export function mergeSource(known: ChatSource, fresh?: ChatSource): ChatSource {
  if (!fresh) {
    return known
  }

  return {
    ...known,
    kind: known.kind ?? fresh.kind,
    name: fresh.name ?? known.name,
    phone: known.phone ?? fresh.phone
  }
}

export function mergeChats(loaded: ChatSource[], learned: ChatSource[]) {
  const loadedIds = new Set(loaded.map(({ chatId }) => chatId))
  const learnedById = new Map(learned.map((source) => [source.chatId, source]))
  const added = learned.filter(({ chatId }) => !loadedIds.has(chatId))

  return [...added, ...loaded].map((source) => {
    const learnedSource = learnedById.get(source.chatId)
    const mergedSource = mergeSource(source, learnedSource)

    return createChat(mergedSource)
  })
}
