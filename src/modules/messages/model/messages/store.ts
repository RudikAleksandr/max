import { createSessionStore } from '@/shared/lib'

import type { MessagesState } from './types'
import {
  appendDeletedId,
  appendMessage,
  appendSentMessage,
  patchOutgoing,
  raiseStatus,
  setEditedText
} from './updaters'

export const useMessagesStore = createSessionStore<MessagesState>((set) => ({
  byChatId: {},
  addMessage: (message) => {
    set((state) => appendMessage(state, message))
  },
  addSentMessage: (message) => {
    set((state) => appendSentMessage(state, message))
  },
  confirmSent: ({ chatId, localId, idMessage }) => {
    set((state) => patchOutgoing(state, {
      chatId,
      localId,
      patch: {
        id: idMessage,
        status: 'sent'
      }
    }))
  },
  failSent: ({ chatId, localId, error }) => {
    set((state) => patchOutgoing(state, {
      chatId,
      localId,
      patch: {
        status: 'failed',
        error
      }
    }))
  },
  recordStatus: (report) => {
    set((state) => raiseStatus(state, report))
  },
  markDeleted: (messageRef) => {
    set((state) => appendDeletedId(state, messageRef))
  },
  recordEdit: (edit) => {
    set((state) => setEditedText(state, edit))
  }
}))
