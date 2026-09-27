export interface SendMessageResponse {
  idMessage: string
}

export interface HistoryMessage {
  type: 'incoming' | 'outgoing'
  idMessage: string
  timestamp: number
  typeMessage: string
  chatId: string
  textMessage?: string
  extendedTextMessage?: {
    text: string
  }
  buttonsMessage?: {
    contentText: string
  }
  statusMessage?: string
  isDeleted?: boolean
  isEdited?: boolean
}
