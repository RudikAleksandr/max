import classNames from 'classnames/bind'

import { formatTime } from '@/modules/messages/lib'
import {
  isOutgoing,
  type Message
} from '@/modules/messages/model'

import { MessageText } from './components/MessageText'
import { STATUS_ICONS } from './constants'
import styles from './MessageBubble.module.scss'

const cx = classNames.bind(styles)

interface MessageBubbleProps {
  message: Message
  joinedAbove: boolean
  joinedBelow: boolean
}

export function MessageBubble({
  message,
  joinedAbove,
  joinedBelow
}: MessageBubbleProps) {
  const isOwn = isOutgoing(message)

  const status = isOwn
    ? STATUS_ICONS[message.status]
    : null

  const isFailed = isOwn && message.status === 'failed'

  const directionClass = isOwn ? 'outgoing' : 'incoming'

  return (
    <div className={cx(
      'bubble',
      directionClass,
      {
        joinedAbove,
        joinedBelow
      }
    )}
    >
      <p className={styles.text}>
        <MessageText text={message.text} />
        <span className={styles.meta}>
          <time>
            {formatTime(message.timestamp)}
          </time>
          {message.isEdited && <span>ред.</span>}
          {status && (
            <status.Icon
              className={cx(
                'status',
                { failed: isFailed }
              )}
              role="img"
              aria-label={status.label}
            />
          )}
        </span>
      </p>
      {isFailed && (
        <p className={styles.error}>
          {message.error ?? STATUS_ICONS.failed.label}
        </p>
      )}
    </div>
  )
}
