import classNames from 'classnames/bind'
import type { ComponentProps } from 'react'

import { Spinner } from '@/shared/ui/Spinner'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'ghost' | 'icon'
  size?: 'xsmall' | 'small' | 'medium'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'small',
  loading = false,
  className,
  type = 'button',
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const hasSize = variant !== 'icon'

  return (
    <button
      type={type}
      className={cx(
        'button',
        variant,
        { [size]: hasSize },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
