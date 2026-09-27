import {
  type UIEvent,
  useLayoutEffect,
  useRef
} from 'react'

import { useChatMessages } from '@/modules/messages/hooks'
import {
  formatDay,
  groupByDay
} from '@/modules/messages/lib'
import { MessageBubble } from '@/modules/messages/ui/MessageBubble'
import {
  EmptyState,
  Spinner
} from '@/shared/ui'

import { LOADER_SIZE_PX } from './constants'
import styles from './MessageList.module.scss'
import {
  isJoinedWith,
  isJustSent,
  isNearBottom
} from './utils'

interface MessageListProps {
  chatId: string
}

export function MessageList({ chatId }: MessageListProps) {
  const { messages, isPending, errorMessage } = useChatMessages(chatId)
  const listRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)

  function handleScroll({ currentTarget }: UIEvent<HTMLDivElement>) {
    isAtBottomRef.current = isNearBottom(currentTarget)
  }

  useLayoutEffect(() => {
    const list = listRef.current
    const lastMessage = messages.at(-1)
    const shouldFollow = isAtBottomRef.current || isJustSent(lastMessage)

    if (!list) {
      return
    }

    if (!shouldFollow) {
      return
    }

    list.scrollTop = list.scrollHeight
  }, [messages])

  const isEmpty = !messages.length
  const groups = groupByDay(messages)

  const placeholder = isPending
    ? (
        <div className={styles.loader}>
          <Spinner size={LOADER_SIZE_PX} />
        </div>
      )
    : (
        <EmptyState
          className={styles.hint}
          errorMessage={errorMessage}
          errorText="Не удалось загрузить переписку"
          emptyText="Сообщений пока нет — напишите первым"
        />
      )

  return (
    <div
      ref={listRef}
      className={styles.list}
      role="log"
      onScroll={handleScroll}
    >
      {isEmpty && placeholder}
      {groups.map((group) => (
        <section
          key={group.day}
          className={styles.day}
        >
          <p className={styles.date}>
            {formatDay(group.day)}
          </p>
          {group.messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              joinedAbove={isJoinedWith(message, group.messages[index - 1])}
              joinedBelow={isJoinedWith(message, group.messages[index + 1])}
            />
          ))}
        </section>
      ))}
    </div>
  )
}
