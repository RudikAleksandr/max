import {
  splitBold,
  type TextPart
} from '@/modules/messages/lib'

interface MessageTextProps {
  text: string
}

export function MessageText({ text }: MessageTextProps) {
  function renderPart(part: TextPart) {
    if (!part.isBold) {
      return part.text
    }

    return (
      <strong key={part.start}>
        {part.text}
      </strong>
    )
  }

  return splitBold(text).map(renderPart)
}
