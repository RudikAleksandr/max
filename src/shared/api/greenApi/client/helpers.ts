import { MS_IN_SECOND } from './constants'

export function toMilliseconds(seconds: number) {
  return seconds * MS_IN_SECOND
}

export function pickName(...names: (string | undefined)[]) {
  return names.find(Boolean)
}

export function toPhoneDigits(phoneNumber?: number) {
  return phoneNumber
    ? String(phoneNumber)
    : undefined
}
