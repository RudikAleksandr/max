export type ChatKind = 'user' | 'bot' | 'group' | 'channel' | 'saved'

export interface Chat {
  chatId: string
  kind: ChatKind
  title: string
  phone?: string
}

export interface ChatSource extends Pick<Chat, 'chatId' | 'phone'> {
  kind?: ChatKind
  name?: string
}

export interface ChatsState {
  learned: ChatSource[]
  learnChat: (source: ChatSource) => void
}

export type ChatsData = Pick<ChatsState, 'learned'>
