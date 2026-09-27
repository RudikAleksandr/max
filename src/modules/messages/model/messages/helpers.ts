import { STATUS_RANK } from './constants'
import type {
  ChatLive,
  DeliveryUpdate,
  Message,
  OutgoingMessage,
  OutgoingStatus
} from './types'

let lastLocalId = 0

function createLocalId() {
  lastLocalId += 1

  return `local-${String(lastLocalId)}`
}

export function createOutgoingMessage(
  chatId: string,
  text: string
): OutgoingMessage {
  return {
    id: createLocalId(),
    chatId,
    text,
    direction: 'out',
    status: 'sending',
    timestamp: Date.now()
  }
}

export function createChatLive(): ChatLive {
  return {
    messages: [],
    statuses: {},
    deletedIds: [],
    editedTexts: {}
  }
}

export function isOutgoing(message?: Message): message is OutgoingMessage {
  return message?.direction === 'out'
}

export function isStatusAhead(next: OutgoingStatus, current: OutgoingStatus) {
  return STATUS_RANK[next] > STATUS_RANK[current]
}

export function findPlaceholder(
  messages: Message[],
  { text }: OutgoingMessage
) {
  const ownWithSameText = messages
    .filter(isOutgoing)
    .filter((message) => message.text === text)

  return ownWithSameText.find(({ status }) => status === 'sending') ??
    ownWithSameText.find(({ status }) => status === 'failed')
}

function applyAheadStatus(message: Message, update?: DeliveryUpdate): Message {
  if (!update) {
    return message
  }

  const isUpdateAhead =
    isOutgoing(message) && isStatusAhead(update.status, message.status)

  if (!isUpdateAhead) {
    return message
  }

  return {
    ...message,
    status: update.status,
    error: update.error
  }
}

function applyEdit(message: Message, text?: string): Message {
  if (!text) {
    return message
  }

  return {
    ...message,
    text,
    isEdited: true
  }
}

export function mergeMessages(
  history: Message[],
  { messages, statuses, deletedIds, editedTexts } = createChatLive()
) {
  const historyIds = new Set(history.map(({ id }) => id))
  const tail = messages.filter(({ id }) => !historyIds.has(id))

  function isShown({ id, isDeleted }: Message) {
    return !isDeleted && !deletedIds.includes(id)
  }

  return [...history, ...tail]
    .filter(isShown)
    .map((message) => applyAheadStatus(message, statuses[message.id]))
    .map((message) => applyEdit(message, editedTexts[message.id]))
}
