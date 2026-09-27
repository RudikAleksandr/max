import type { ChatType } from '@/shared/api/greenApi'

export interface SenderData {
  chatId: string
  chatType?: ChatType
  chatName?: string
  senderName?: string
  senderContactName?: string
  senderPhoneNumber?: number
}

export interface MessageData {
  typeMessage: string
  textMessageData?: {
    textMessage: string
  }
  extendedTextMessageData?: {
    text: string
  }
  buttonsMessage?: {
    contentText: string
  }
  deletedMessageData?: {
    stanzaId: string
  }
  editedMessageData?: {
    stanzaId: string
    textMessage: string
  }
}

export interface NotificationBody {
  typeWebhook: string
  timestamp: number
  idMessage?: string
  senderData?: SenderData
  messageData?: MessageData
  chatId?: string
  status?: string
  description?: string
}

export interface Notification {
  receiptId: number
  body: NotificationBody
}
