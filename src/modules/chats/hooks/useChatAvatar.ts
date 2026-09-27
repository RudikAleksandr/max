import { useQuery } from '@tanstack/react-query'

import { useCredentials } from '@/modules/auth'
import { getAvatar } from '@/modules/chats/api'
import type { Chat } from '@/modules/chats/model'
import { retryTransient } from '@/shared/api/http'

export function useChatAvatar({ chatId, kind }: Chat) {
  const { idInstance } = useCredentials()

  const { data } = useQuery({
    queryKey: ['avatar', idInstance, chatId],
    queryFn: () => getAvatar(chatId),
    enabled: kind === 'bot',
    retry: retryTransient,
    retryOnMount: false,
    staleTime: Infinity
  })

  return data
}
