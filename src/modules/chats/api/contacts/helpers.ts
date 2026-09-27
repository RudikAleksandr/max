import { pickName } from '@/shared/api/greenApi'

import type {
  CheckAccountResponse,
  ContactInfo
} from './types'

export function parseAccountCheck(response: CheckAccountResponse) {
  if ('status' in response) {
    throw new Error(response.reason)
  }

  return response.exist
    ? response.chatId
    : undefined
}

export function parseContactName({ name, contactName }: ContactInfo) {
  return pickName(name, contactName)
}
