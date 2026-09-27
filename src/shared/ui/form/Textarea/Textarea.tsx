import classNames from 'classnames/bind'
import type { ComponentProps } from 'react'

import styles from './Textarea.module.scss'

const cx = classNames.bind(styles)

type TextareaProps = ComponentProps<'textarea'>

export function Textarea({
  className,
  rows = 1,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cx('textarea', className)}
      rows={rows}
      {...props}
    />
  )
}
