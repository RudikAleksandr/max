import { useChats } from '@/modules/chats/hooks'
import { ChatCell } from '@/modules/chats/ui/ChatCell'
import { EmptyState } from '@/shared/ui'

import styles from './ChatList.module.scss'

interface ChatListProps {
  activeChatId?: string
  onOpenChat: (chatId: string) => void
}

export function ChatList({ activeChatId, onOpenChat }: ChatListProps) {
  const { chats, isPending, errorMessage } = useChats()

  if (!chats.length) {
    return (
      <EmptyState
        className={styles.empty}
        isPending={isPending}
        pendingText="Загружаем чаты"
        errorMessage={errorMessage}
        errorText="Не удалось загрузить чаты"
        emptyText="Чатов пока нет — введите номер телефона выше"
      />
    )
  }

  return (
    <ul className={styles.list}>
      {chats.map((chat) => (
        <ChatCell
          key={chat.chatId}
          chat={chat}
          isActive={chat.chatId === activeChatId}
          onOpenChat={onOpenChat}
        />
      ))}
    </ul>
  )
}
