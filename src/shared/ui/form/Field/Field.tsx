import type { ReactNode } from 'react'

import styles from './Field.module.scss'
import { getErrorId } from './useFieldControl'

interface FieldProps {
  label: string
  error?: string
  controlId: string
  children: ReactNode
}

export function Field({
  label,
  error,
  controlId,
  children
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label
        htmlFor={controlId}
        className={styles.label}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          id={getErrorId(controlId)}
          role="alert"
          className={styles.error}
        >
          {error}
        </span>
      )}
    </div>
  )
}
