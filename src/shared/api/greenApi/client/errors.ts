import { isAxiosError } from 'axios'

import {
  isNetworkError,
  isTimeoutError
} from '@/shared/api/http'

import {
  ERROR_MESSAGES,
  STATUS_MESSAGES
} from './constants'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getServerMessage(data: unknown) {
  const message = isRecord(data)
    ? data.message
    : undefined

  return typeof message === 'string'
    ? message
    : ''
}

export function getGreenApiErrorMessage(error: unknown) {
  if (!isAxiosError(error)) {
    return error instanceof Error
      ? error.message
      : ERROR_MESSAGES.unknown
  }

  if (isNetworkError(error)) {
    return ERROR_MESSAGES.network
  }

  if (isTimeoutError(error)) {
    return ERROR_MESSAGES.timeout
  }

  const { response } = error

  if (!response) {
    return error.message
  }

  const knownMessage = STATUS_MESSAGES[response.status]

  if (knownMessage) {
    return knownMessage
  }

  const serverMessage = getServerMessage(response.data)

  if (serverMessage) {
    return serverMessage
  }

  return `Ошибка запроса (HTTP ${String(response.status)})`
}

export function getGreenApiQueryErrorMessage(error: Error | null) {
  return error
    ? getGreenApiErrorMessage(error)
    : null
}
