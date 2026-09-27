import classNames from 'classnames/bind'

import { useIsOnline } from '@/shared/hooks'

import styles from './NetworkStatus.module.scss'

const cx = classNames.bind(styles)

interface NetworkStatusProps {
  className?: string
}

export function NetworkStatus({ className }: NetworkStatusProps) {
  const isOnline = useIsOnline()

  if (isOnline) {
    return null
  }

  return (
    <p className={cx('status', className)}>
      Ожидание сети…
    </p>
  )
}
