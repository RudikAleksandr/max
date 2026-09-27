import { keepDigits } from '@/shared/lib'

import {
  API_TOKEN_LENGTH,
  ID_INSTANCE_MAX_LENGTH,
  WHITESPACE
} from './constants'

export function sanitizeIdInstance(value: string) {
  return keepDigits(value).slice(0, ID_INSTANCE_MAX_LENGTH)
}

export function sanitizeToken(value: string) {
  return value
    .replace(WHITESPACE, '')
    .slice(0, API_TOKEN_LENGTH)
}
