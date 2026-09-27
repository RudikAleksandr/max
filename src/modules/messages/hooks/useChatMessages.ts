import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useCredentials } from '@/modules/auth'
import { getChatHistory } from '@/modules/messages/api'
import {
  mergeMessages,
  useMessagesStore
} from '@/modules/messages/model'
import { getGreenApiQueryErrorMessage } from '@/shared/api/greenApi'
import { retryTransient } from '@/shared/api/http'

export function useChatMessages(chatId: string) {
  const { idInstance } = useCredentials()
  const live = useMessagesStore(({ byChatId }) => byChatId[chatId])

  const { data: history, isPending, error } = useQuery({
    queryKey: ['history', idInstance, chatId],
    queryFn: () => getChatHistory(chatId),
    retry: retryTransient,
    staleTime: Infinity,
    gcTime: Infinity
  })

  const messages = useMemo(
    () => mergeMessages(history ?? [], live),
    [history, live]
  )

  return {
    messages,
    isPending,
    errorMessage: getGreenApiQueryErrorMessage(error)
  }
}
