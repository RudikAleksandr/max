import { postToGreenApi } from '@/shared/api/greenApi'

import { HISTORY_COUNT } from './constants'
import { parseHistory } from './helpers'
import type {
  HistoryMessage,
  SendMessageResponse
} from './types'

export async function sendMessage(chatId: string, message: string) {
  const { idMessage } = await postToGreenApi<SendMessageResponse>(
    'sendMessage',
    {
      chatId,
      message
    }
  )

  return idMessage
}

export async function getChatHistory(chatId: string) {
  const history = await postToGreenApi<HistoryMessage[]>(
    'getChatHistory',
    {
      chatId,
      count: HISTORY_COUNT
    }
  )

  return parseHistory(history)
}
