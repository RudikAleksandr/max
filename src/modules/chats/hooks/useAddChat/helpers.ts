import { getGreenApiErrorMessage } from '@/shared/api/greenApi'
import {
  hasStatus,
  HTTP_STATUS
} from '@/shared/api/http'

import { INVALID_NUMBER_ERROR } from './constants'
import type { AddChatFailure } from './types'

export function toAddChatFailure(error: unknown): AddChatFailure {
  if (hasStatus(error, HTTP_STATUS.BAD_REQUEST)) {
    return {
      error: INVALID_NUMBER_ERROR,
      canRetry: false
    }
  }

  return {
    error: getGreenApiErrorMessage(error),
    canRetry: true
  }
}
