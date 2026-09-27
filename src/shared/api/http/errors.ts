import {
  AxiosError,
  isAxiosError
} from 'axios'

export function hasStatus(error: unknown, status: number) {
  return isAxiosError(error) && error.response?.status === status
}

export function isNetworkError(error: unknown) {
  return isAxiosError(error) && error.code === AxiosError.ERR_NETWORK
}

export function isTimeoutError({ code }: AxiosError) {
  return (
    code === AxiosError.ECONNABORTED ||
    code === AxiosError.ETIMEDOUT
  )
}

export function isOfflineError(error: unknown) {
  return isNetworkError(error) && !navigator.onLine
}
