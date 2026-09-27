import { useMutation } from '@tanstack/react-query'

import { findAccount } from '@/modules/chats/api'
import { useChats } from '@/modules/chats/hooks/useChats'
import { upsertChat } from '@/modules/chats/model'

import { NO_ACCOUNT_ERROR } from './constants'
import { toAddChatFailure } from './helpers'
import type { AddChatResult } from './types'

export function useAddChat() {
  const { chats } = useChats()

  const { mutateAsync: checkPhone, isPending } = useMutation({
    mutationFn: (phone: string) => {
      const knownChatIds = new Set(chats.map(({ chatId }) => chatId))

      return findAccount(phone, knownChatIds)
    }
  })

  async function addChatByPhone(phone: string): Promise<AddChatResult> {
    const existing = chats.find((chat) => chat.phone === phone)

    if (existing) {
      return {
        chatId: existing.chatId
      }
    }

    try {
      const account = await checkPhone(phone)

      if (!account) {
        return {
          error: NO_ACCOUNT_ERROR,
          canRetry: false
        }
      }

      upsertChat({
        ...account,
        phone
      })

      return {
        chatId: account.chatId
      }
    } catch (error) {
      return toAddChatFailure(error)
    }
  }

  return {
    addChatByPhone,
    isPending
  }
}
