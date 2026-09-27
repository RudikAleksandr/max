import { getGreenApiErrorMessage } from '@/shared/api/greenApi'
import { isNetworkError } from '@/shared/api/http'

import { UNREACHABLE_INSTANCE_MESSAGE } from './constants'

export function getLoginError(error: unknown) {
  const isUnreachable = isNetworkError(error) && navigator.onLine

  return isUnreachable
    ? UNREACHABLE_INSTANCE_MESSAGE
    : getGreenApiErrorMessage(error)
}
