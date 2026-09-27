import {
  type Chat,
  ChatAvatar
} from '@/modules/chats'
import { MessageInput } from '@/modules/messages/ui/MessageInput'
import { MessageList } from '@/modules/messages/ui/MessageList'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg?react'
import { useIsOnline } from '@/shared/hooks'
import {
  Button,
  NetworkStatus
} from '@/shared/ui'

import styles from './ChatWindow.module.scss'

interface ChatWindowProps {
  chat: Chat
  onBack: () => void
}

export function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const isOnline = useIsOnline()

  return (
    <section className={styles.window}>
      <header className={styles.header}>
        <Button
          variant="ghost"
          className={styles.back}
          onClick={onBack}
          aria-label="К списку чатов"
        >
          <ArrowLeftIcon />
        </Button>
        <ChatAvatar
          chat={chat}
          size="medium"
        />
        <div className={styles.heading}>
          <h2 className={styles.title}>
            {chat.title}
          </h2>
          <NetworkStatus className={styles.status} />
        </div>
      </header>
      <MessageList chatId={chat.chatId} />
      <MessageInput
        chatId={chat.chatId}
        hidden={!isOnline}
      />
    </section>
  )
}
