import { createSessionStore } from '@/shared/lib'

import type { ChatsState } from './types'
import { learnSource } from './updaters'

export const useChatsStore = createSessionStore<ChatsState>((set) => ({
  learned: [],
  learnChat: (source) => {
    set((state) => learnSource(state, source))
  }
}))
