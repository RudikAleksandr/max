import { mergeSource } from './helpers'
import type {
  ChatsData,
  ChatSource
} from './types'

export function learnSource(
  state: ChatsData,
  source: ChatSource
): Partial<ChatsData> {
  const known = state.learned.find(({ chatId }) => chatId === source.chatId)

  if (!known) {
    return {
      learned: [source, ...state.learned]
    }
  }

  const merged = mergeSource(known, source)

  const isUnchanged =
    merged.kind === known.kind &&
    merged.name === known.name &&
    merged.phone === known.phone

  if (isUnchanged) {
    return state
  }

  return {
    learned: state.learned.map((chat) => chat === known ? merged : chat)
  }
}
