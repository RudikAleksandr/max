interface AddedChat {
  chatId: string
}

export interface AddChatFailure {
  error: string
  canRetry: boolean
}

export type AddChatResult = AddedChat | AddChatFailure
