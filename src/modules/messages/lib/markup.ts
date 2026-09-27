import { BOLD_PATTERN } from './constants'

export interface TextPart {
  text: string
  isBold: boolean
  start: number
}

export function splitBold(text: string) {
  const parts: TextPart[] = []
  let cursor = 0

  for (const match of text.matchAll(BOLD_PATTERN)) {
    const [marked, inner = ''] = match

    if (match.index > cursor) {
      parts.push({
        text: text.slice(cursor, match.index),
        isBold: false,
        start: cursor
      })
    }

    parts.push({
      text: inner,
      isBold: true,
      start: match.index
    })

    cursor = match.index + marked.length
  }

  if (cursor < text.length) {
    parts.push({
      text: text.slice(cursor),
      isBold: false,
      start: cursor
    })
  }

  return parts
}
