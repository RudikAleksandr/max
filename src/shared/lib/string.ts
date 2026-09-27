import { NON_DIGITS } from './constants'

export function keepDigits(value: string) {
  return value.replace(NON_DIGITS, '')
}
