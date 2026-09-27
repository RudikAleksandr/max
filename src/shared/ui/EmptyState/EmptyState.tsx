import classNames from 'classnames/bind'

import { Spinner } from '@/shared/ui/Spinner'

import styles from './EmptyState.module.scss'

const cx = classNames.bind(styles)

interface EmptyStateProps {
  isPending?: boolean
  errorMessage: string | null
  pendingText?: string
  errorText: string
  emptyText: string
  className?: string
}

export function EmptyState({
  isPending = false,
  errorMessage,
  pendingText,
  errorText,
  emptyText,
  className
}: EmptyStateProps) {
  const resultText = errorMessage
    ? `${errorText}: ${errorMessage}`
    : emptyText

  const text = isPending
    ? pendingText
    : resultText

  return (
    <p className={cx('state', className)}>
      {isPending && <Spinner />}
      {text}
    </p>
  )
}
