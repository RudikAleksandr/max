import { useId } from 'react'

export function getErrorId(controlId: string) {
  return `${controlId}-error`
}

export function useFieldControl(error?: string, id?: string) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const hasError = Boolean(error)

  return {
    id: controlId,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError
      ? getErrorId(controlId)
      : undefined
  }
}
