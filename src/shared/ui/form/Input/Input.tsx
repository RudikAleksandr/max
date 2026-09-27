import classNames from 'classnames/bind'
import type {
  ChangeEvent,
  ComponentProps
} from 'react'

import {
  Field,
  useFieldControl
} from '@/shared/ui/form/Field'

import styles from './Input.module.scss'
import {
  type Sanitize,
  sanitizeValue
} from './utils'

const cx = classNames.bind(styles)

interface InputProps extends ComponentProps<'input'> {
  label: string
  error?: string
  sanitize?: Sanitize
}

export function Input({
  label,
  error,
  sanitize,
  id,
  className,
  onChange,
  ...props
}: InputProps) {
  const controlProps = useFieldControl(error, id)

  function sanitizeInput(input: HTMLInputElement) {
    if (!sanitize) {
      return
    }

    const caret = input.selectionStart ?? input.value.length

    const sanitized = sanitizeValue({
      value: input.value,
      caret
    }, sanitize)

    if (sanitized.value === input.value) {
      return
    }

    input.value = sanitized.value
    input.setSelectionRange(sanitized.caret, sanitized.caret)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    sanitizeInput(event.target)
    onChange?.(event)
  }

  return (
    <Field
      label={label}
      error={error}
      controlId={controlProps.id}
    >
      <input
        {...controlProps}
        className={cx(
          'input',
          { invalid: error },
          className
        )}
        onChange={handleChange}
        {...props}
      />
    </Field>
  )
}
