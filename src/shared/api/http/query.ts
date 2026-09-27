import {
  HTTP_STATUS,
  MAX_TRANSIENT_RETRIES
} from './constants'
import {
  hasStatus,
  isNetworkError
} from './errors'

function isTransientError(error: Error) {
  return (
    isNetworkError(error) || hasStatus(error, HTTP_STATUS.TOO_MANY_REQUESTS)
  )
}

export function retryTransient(failureCount: number, error: Error) {
  return (
    !navigator.onLine ||
    (failureCount < MAX_TRANSIENT_RETRIES && isTransientError(error))
  )
}

export function isQueryCancelled({ signal }: { signal: AbortSignal }) {
  return signal.aborted
}
