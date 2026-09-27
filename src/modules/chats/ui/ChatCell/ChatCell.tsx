import classNames from 'classnames/bind'

import type { Chat } from '@/modules/chats/model'
import { ChatAvatar } from '@/modules/chats/ui/ChatAvatar'

import styles from './ChatCell.module.scss'

const cx = classNames.bind(styles)

interface ChatCellProps {
  chat: Chat
  isActive: boolean
  onOpenChat: (chatId: string) => void
}

export function ChatCell({
  chat,
  isActive,
  onOpenChat
}: ChatCellProps) {
  function handleClick() {
    onOpenChat(chat.chatId)
  }

  return (
    <li>
      <button
        className={cx(
          'cell',
          { active: isActive }
        )}
        onClick={handleClick}
      >
        <ChatAvatar
          chat={chat}
          size="large"
        />
        <span className={styles.title}>
          {chat.title}
        </span>
      </button>
    </li>
  )
}
