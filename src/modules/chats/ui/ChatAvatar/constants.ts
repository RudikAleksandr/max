import type { ChatKind } from '@/modules/chats/model'
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg?react'

export const KIND_ICONS: Partial<Record<ChatKind, typeof BookmarkIcon>> = {
  saved: BookmarkIcon
}
