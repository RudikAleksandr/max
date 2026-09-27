import type { OutgoingStatus } from './types'

export const MAX_MESSAGE_LENGTH = 4000

export const STATUS_RANK: Record<OutgoingStatus, number> = {
  sending: 0,
  sent: 1,
  failed: 2,
  delivered: 3,
  read: 4
}
