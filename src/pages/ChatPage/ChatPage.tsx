import classNames from 'classnames/bind'
import { useState } from 'react'
import {
  Navigate,
  useNavigate,
  useParams
} from 'react-router'

import { LogoutButton } from '@/modules/auth'
import {
  ChatList,
  NewChatForm,
  useChat,
  useChats
} from '@/modules/chats'
import {
  ChatWindow,
  useIncomingMessages
} from '@/modules/messages'
import {
  getChatPath,
  ROUTES
} from '@/shared/config'
import { useIsOnline } from '@/shared/hooks'
import {
  Banner,
  NetworkStatus
} from '@/shared/ui'

import styles from './ChatPage.module.scss'

const cx = classNames.bind(styles)

export function ChatPage() {
  const [hasShownPage, setHasShownPage] = useState(false)
  const { chatId } = useParams()
  const navigate = useNavigate()
  const activeChat = useChat(chatId)
  const isOnline = useIsOnline()

  const {
    isPending: isLoadingChats,
    isPaused: isWaitingForNetwork
  } = useChats()

  const { errorMessage: incomingErrorMessage } = useIncomingMessages()

  function openChat(id: string) {
    const path = getChatPath(id)

    navigate(path)
  }

  function closeChat() {
    navigate(ROUTES.HOME)
  }

  const isSplash = isLoadingChats && !isWaitingForNetwork && !hasShownPage

  const isFirstShow = !isSplash && !hasShownPage

  if (isFirstShow) {
    setHasShownPage(true)
  }

  if (isSplash) {
    return null
  }

  const isUnknownChat = Boolean(chatId) && !activeChat && !isLoadingChats

  if (isUnknownChat) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return (
    <div className={cx(
      'page',
      { chatOpen: activeChat }
    )}
    >
      {incomingErrorMessage && (
        <div className={styles.banner}>
          <Banner>
            {incomingErrorMessage}
          </Banner>
        </div>
      )}
      <aside className={styles.sidebar}>
        <header className={cx(
          'sidebarHeader',
          { offline: !isOnline }
        )}
        >
          <div className={styles.heading}>
            <h1 className={styles.title}>Чаты</h1>
            <NetworkStatus className={styles.status} />
          </div>
          <LogoutButton />
        </header>
        <NewChatForm onOpenChat={openChat} />
        <ChatList
          activeChatId={chatId}
          onOpenChat={openChat}
        />
      </aside>
      <main className={styles.main}>
        {activeChat ? (
          <ChatWindow
            key={activeChat.chatId}
            chat={activeChat}
            onBack={closeChat}
          />
        ) : (
          <p className={styles.empty}>
            Выберите чат или создайте новый
          </p>
        )}
      </main>
    </div>
  )
}
