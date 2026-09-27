import { useChats } from './useChats'

export function useChat(chatId?: string) {
  const { chats } = useChats()

  return chats.find((chat) => chat.chatId === chatId)
}
