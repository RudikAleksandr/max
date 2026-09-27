import {
  isOutgoing,
  type Message
} from '@/modules/messages/model'

import { NEAR_BOTTOM_PX } from './constants'

export function isNearBottom({
  scrollHeight,
  scrollTop,
  clientHeight
}: HTMLElement) {
  const distanceToBottom = scrollHeight - scrollTop - clientHeight

  return distanceToBottom <= NEAR_BOTTOM_PX
}

export function isJustSent(message?: Message) {
  return isOutgoing(message) && message.status === 'sending'
}

export function isJoinedWith({ direction }: Message, neighbour?: Message) {
  return neighbour?.direction === direction
}
