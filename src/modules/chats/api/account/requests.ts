import { getFromGreenApi } from '@/shared/api/greenApi'

import type { AccountSettings } from './types'

function getAccountSettings() {
  return getFromGreenApi<AccountSettings>('getAccountSettings')
}

export async function fetchAccountChatId() {
  try {
    const { chatId } = await getAccountSettings()

    return chatId
  } catch {
    return undefined
  }
}
