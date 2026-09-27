import { useChatAvatar } from '@/modules/chats/hooks'
import type { Chat } from '@/modules/chats/model'
import { Avatar } from '@/shared/ui'

import { KIND_ICONS } from './constants'

interface ChatAvatarProps {
  chat: Chat
  size: 'medium' | 'large'
}

export function ChatAvatar({ chat, size }: ChatAvatarProps) {
  const avatarUrl = useChatAvatar(chat)

  return (
    <Avatar
      id={chat.chatId}
      name={chat.title}
      size={size}
      src={avatarUrl}
      Icon={KIND_ICONS[chat.kind]}
    />
  )
}
