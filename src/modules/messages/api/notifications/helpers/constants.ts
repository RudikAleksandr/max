import type { MessageData } from '@/modules/messages/api/notifications/types'
import type { Message } from '@/modules/messages/model'
import type { ChatType } from '@/shared/api/greenApi'

export const MESSAGE_DIRECTIONS: Record<string, Message['direction']> = {
  incomingMessageReceived: 'in',
  outgoingAPIMessageReceived: 'out'
}

export const TEXT_EXTRACTORS: Record<
  string,
  (data: MessageData) => string | undefined
> = {
  textMessage: ({ textMessageData }) => textMessageData?.textMessage,
  extendedTextMessage: ({ extendedTextMessageData }) =>
    extendedTextMessageData?.text,
  quotedMessage: ({ extendedTextMessageData }) =>
    extendedTextMessageData?.text,
  buttonsMessage: ({ buttonsMessage }) => buttonsMessage?.contentText
}

export const FAILURE_MESSAGES: Record<string, string> = {
  failed: 'MAX не доставил сообщение',
  noAccount: 'У получателя нет аккаунта MAX',
  notInGroup: 'Вы не участник этого чата'
}

export const SUSPENDED_PATTERN = /suspended/i

export const SUSPENDED_HINT =
  'аккаунт временно ограничен — MAX доставляет сообщения только тем, у кого ваш номер сохранён в контактах'

export const GROUP_CHAT_TYPES: ChatType[] = ['group', 'channel']
