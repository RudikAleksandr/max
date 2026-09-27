import {
  createChatLive,
  findPlaceholder,
  isOutgoing,
  isStatusAhead
} from './helpers'
import type {
  ChatLivePatch,
  DeliveryReport,
  Message,
  MessageEdit,
  MessageRef,
  MessagesData,
  OutgoingMessage,
  PendingPatch
} from './types'

function patchChatLive(
  state: MessagesData,
  { chatId, ...patch }: ChatLivePatch
): Partial<MessagesData> {
  const live = state.byChatId[chatId] ?? createChatLive()

  return {
    byChatId: {
      ...state.byChatId,
      [chatId]: {
        ...live,
        ...patch
      }
    }
  }
}

export function patchOutgoing(
  state: MessagesData,
  { chatId, localId, patch }: PendingPatch
): Partial<MessagesData> {
  const messages = state.byChatId[chatId]?.messages ?? []

  function isTarget(message: Message): message is OutgoingMessage {
    return isOutgoing(message) && message.id === localId
  }

  function isQueueCopy({ id }: Message) {
    return id === patch.id
  }

  function applyPatch(message: Message): Message {
    if (!isTarget(message)) {
      return message
    }

    return {
      ...message,
      ...patch
    }
  }

  if (!messages.some(isTarget)) {
    return state
  }

  const withoutCopy = messages.filter((message) => !isQueueCopy(message))

  return patchChatLive(state, {
    chatId,
    messages: withoutCopy.map(applyPatch)
  })
}

export function appendMessage(
  state: MessagesData,
  message: Message
): Partial<MessagesData> {
  const messages = state.byChatId[message.chatId]?.messages ?? []
  const isDuplicate = messages.some(({ id }) => id === message.id)

  if (isDuplicate) {
    return state
  }

  return patchChatLive(state, {
    chatId: message.chatId,
    messages: [...messages, message]
  })
}

export function appendSentMessage(
  state: MessagesData,
  message: OutgoingMessage
): Partial<MessagesData> {
  const messages = state.byChatId[message.chatId]?.messages ?? []
  const isDuplicate = messages.some(({ id }) => id === message.id)

  if (isDuplicate) {
    return state
  }

  const placeholder = findPlaceholder(messages, message)

  if (!placeholder) {
    return appendMessage(state, message)
  }

  function takePlaceholder(known: Message) {
    return known === placeholder ? message : known
  }

  return patchChatLive(state, {
    chatId: message.chatId,
    messages: messages.map(takePlaceholder)
  })
}

export function appendDeletedId(
  state: MessagesData,
  { chatId, idMessage }: MessageRef
): Partial<MessagesData> {
  const deletedIds = state.byChatId[chatId]?.deletedIds ?? []
  const isRecorded = deletedIds.includes(idMessage)

  if (isRecorded) {
    return state
  }

  return patchChatLive(state, {
    chatId,
    deletedIds: [...deletedIds, idMessage]
  })
}

export function setEditedText(
  state: MessagesData,
  { chatId, idMessage, text }: MessageEdit
): Partial<MessagesData> {
  const editedTexts = state.byChatId[chatId]?.editedTexts ?? {}
  const isRecorded = editedTexts[idMessage] === text

  if (isRecorded) {
    return state
  }

  return patchChatLive(state, {
    chatId,
    editedTexts: {
      ...editedTexts,
      [idMessage]: text
    }
  })
}

export function raiseStatus(
  state: MessagesData,
  { chatId, idMessage, update }: DeliveryReport
): Partial<MessagesData> {
  const statuses = state.byChatId[chatId]?.statuses ?? {}
  const recorded = statuses[idMessage]

  const isBehindRecorded =
    recorded && !isStatusAhead(update.status, recorded.status)

  if (isBehindRecorded) {
    return state
  }

  return patchChatLive(state, {
    chatId,
    statuses: {
      ...statuses,
      [idMessage]: update
    }
  })
}
