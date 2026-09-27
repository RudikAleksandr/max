import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useCredentials } from '@/modules/auth'
import {
  fetchAccountChatId,
  getChats
} from '@/modules/chats/api'
import {
  markSavedChat,
  mergeChats,
  useChatsStore
} from '@/modules/chats/model'
import { getGreenApiQueryErrorMessage } from '@/shared/api/greenApi'
import { retryTransient } from '@/shared/api/http'

export function useChats() {
  const { idInstance } = useCredentials()
  const learned = useChatsStore((state) => state.learned)

  const {
    data: loaded,
    isPending,
    isPaused,
    error
  } = useQuery({
    queryKey: ['chats', idInstance],
    queryFn: async () => {
      const [sources, accountChatId] = await Promise.all([
        getChats(),
        fetchAccountChatId()
      ])

      return markSavedChat(sources, accountChatId)
    },
    retry: retryTransient,
    retryOnMount: false,
    staleTime: Infinity
  })

  const chats = useMemo(
    () => mergeChats(loaded ?? [], learned),
    [loaded, learned]
  )

  return {
    chats,
    isPending,
    isPaused,
    errorMessage: getGreenApiQueryErrorMessage(error)
  }
}
