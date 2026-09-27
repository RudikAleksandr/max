import {
  GRADIENTS,
  LETTER,
  MAX_INITIALS
} from './constants'

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .flatMap((word) => LETTER.exec(word) ?? [])
    .slice(0, MAX_INITIALS)
    .join('')
    .toUpperCase()
}

export function getGradient(id: string) {
  const index = Math.abs(Number(id) % GRADIENTS.length)
  const [from, to] = GRADIENTS[index] ?? GRADIENTS[0]

  return `linear-gradient(135deg, ${from}, ${to})`
}
