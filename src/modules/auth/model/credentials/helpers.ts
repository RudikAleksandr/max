import type { StateInstance } from '@/shared/api/greenApi'

import { STATE_ERRORS } from './constants'

export function getStateError(state: StateInstance) {
  return STATE_ERRORS[state]
}
