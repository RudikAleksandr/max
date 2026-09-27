import type { ReactNode } from 'react'

import styles from './Banner.module.scss'

interface BannerProps {
  children: ReactNode
}

export function Banner({ children }: BannerProps) {
  return (
    <div
      role="alert"
      className={styles.banner}
    >
      {children}
    </div>
  )
}
