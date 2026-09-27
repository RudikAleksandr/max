import SpinnerIcon from '@/shared/assets/icons/spinner.svg?react'

import styles from './Spinner.module.scss'

interface SpinnerProps {
  size?: number
}

export function Spinner({ size = 18 }: SpinnerProps) {
  return (
    <SpinnerIcon
      className={styles.spinner}
      width={size}
      height={size}
      aria-hidden="true"
    />
  )
}
