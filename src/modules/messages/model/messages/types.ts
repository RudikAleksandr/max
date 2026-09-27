import type { ChatSource } from '@/modules/chats'

export type OutgoingStatus =
  'sending' | 'sent' | 'delivered' | 'read' | 'failed'

export interface DeliveryUpdate {
  status: OutgoingStatus
  error?: string
}

interface MessageBase {
  id: string
  chatId: string
  text: string
  timestamp: number
  isDeleted?: boolean
  isEdited?: boolean
}

export interface IncomingMessage extends MessageBase {
  direction: 'in'
}

export interface OutgoingMessage extends MessageBase {
  direction: 'out'
  status: OutgoingStatus
  error?: string
}

export type Message = IncomingMessage | OutgoingMessage

export interface MessageRef {
  chatId: string
  idMessage: string
}

export interface DeliveryReport extends MessageRef {
  update: DeliveryUpdate
}

export interface MessageEdit extends MessageRef {
  text: string
}

export interface PendingSend {
  chatId: string
  localId: string
}

export interface SendConfirmation extends PendingSend {
  idMessage: string
}

export interface SendFailure extends PendingSend {
  error: string
}

export interface ChatLive {
  messages: Message[]
  statuses: Record<string, DeliveryUpdate>
  deletedIds: string[]
  editedTexts: Record<string, string>
}

export interface IncomingEvent {
  type: 'incoming'
  chat: ChatSource
  message: IncomingMessage
}

export interface OutgoingEvent {
  type: 'outgoing'
  chat: ChatSource
  message: OutgoingMessage
}

export interface DeliveryEvent extends DeliveryReport {
  type: 'delivery'
}

export interface DeletionEvent extends MessageRef {
  type: 'deletion'
}

export interface EditEvent extends MessageEdit {
  type: 'edit'
}

export type NotificationEvent =
  IncomingEvent | OutgoingEvent | DeliveryEvent | DeletionEvent | EditEvent

export interface MessagesState {
  byChatId: Record<string, ChatLive>
  addMessage: (message: Message) => void
  addSentMessage: (message: OutgoingMessage) => void
  confirmSent: (confirmation: SendConfirmation) => void
  failSent: (failure: SendFailure) => void
  recordStatus: (report: DeliveryReport) => void
  markDeleted: (messageRef: MessageRef) => void
  recordEdit: (edit: MessageEdit) => void
}

export type MessagesData = Pick<MessagesState, 'byChatId'>

export interface ChatLivePatch extends Partial<ChatLive> {
  chatId: string
}

export type OutgoingPatch = Partial<
  Pick<OutgoingMessage, 'id' | 'status' | 'error'>
>

export interface PendingPatch extends PendingSend {
  patch: OutgoingPatch
}
