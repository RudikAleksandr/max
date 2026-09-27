import { postToGreenApi } from '@/shared/api/greenApi'

import {
  parseAccountCheck,
  parseContactName
} from './helpers'
import type {
  AvatarResponse,
  CheckAccountResponse,
  ContactInfo
} from './types'

export async function checkAccount(phone: string) {
  const accountCheck = await postToGreenApi<CheckAccountResponse>(
    'checkAccount',
    { phoneNumber: Number(phone) }
  )

  return parseAccountCheck(accountCheck)
}

async function getContactInfo(chatId: string) {
  const contact = await postToGreenApi<ContactInfo>(
    'getContactInfo',
    { chatId }
  )

  return parseContactName(contact)
}

async function fetchChatName(chatId: string) {
  try {
    return await getContactInfo(chatId)
  } catch {
    return undefined
  }
}

export async function findAccount(
  phone: string,
  knownChatIds: ReadonlySet<string>
) {
  const chatId = await checkAccount(phone)

  if (!chatId) {
    return undefined
  }

  const isKnownChat = knownChatIds.has(chatId)

  const name = isKnownChat
    ? undefined
    : await fetchChatName(chatId)

  return {
    chatId,
    name
  }
}

export async function getAvatar(chatId: string) {
  const { urlAvatar } = await postToGreenApi<AvatarResponse>(
    'getAvatar',
    { chatId }
  )

  return urlAvatar
}
