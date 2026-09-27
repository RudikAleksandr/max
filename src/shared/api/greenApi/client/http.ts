import axios, { CanceledError } from 'axios'

import {
  hasStatus,
  HTTP_STATUS
} from '@/shared/api/http'

import {
  INVALID_CREDENTIALS_MESSAGE,
  REQUEST_TIMEOUT_MS
} from './constants'
import type {
  GreenApiMethod,
  GreenApiSession
} from './types'

export const http = axios.create({
  baseURL: import.meta.env.VITE_GREEN_API_URL,
  timeout: REQUEST_TIMEOUT_MS
})

let session: GreenApiSession | undefined
let sessionRequests = new AbortController()

http.interceptors.response.use(null, (error: unknown) => {
  if (hasStatus(error, HTTP_STATUS.UNAUTHORIZED)) {
    session?.onUnauthorized(INVALID_CREDENTIALS_MESSAGE)
  }

  throw error
})

export function connectGreenApiSession(nextSession: GreenApiSession) {
  session = nextSession
}

export function cancelGreenApiRequests() {
  sessionRequests.abort()
  sessionRequests = new AbortController()
}

export function getSessionSignal() {
  return sessionRequests.signal
}

function getSessionCredentials() {
  const credentials = session?.getCredentials()

  if (!credentials) {
    throw new CanceledError()
  }

  return credentials
}

export function buildGreenApiUrl(
  method: GreenApiMethod,
  { idInstance, apiTokenInstance } = getSessionCredentials()
) {
  return `/waInstance${idInstance}/${method}/${apiTokenInstance}`
}
