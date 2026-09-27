export type Sanitize = (value: string) => string

export interface TextWithCaret {
  value: string
  caret: number
}

export function sanitizeValue(
  { value, caret }: TextWithCaret,
  sanitize: Sanitize
) {
  const beforeCaret = value.slice(0, caret)

  return {
    value: sanitize(value),
    caret: sanitize(beforeCaret).length
  }
}
