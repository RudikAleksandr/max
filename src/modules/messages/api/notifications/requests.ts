import {
  deleteFromGreenApi,
  getFromGreenApi
} from '@/shared/api/greenApi'
import {
  hasStatus,
  HTTP_STATUS,
  isOfflineError
} from '@/shared/api/http'

import {
  RECEIVE_REQUEST_TIMEOUT_MS,
  RECEIVE_TIMEOUT_SECONDS
} from './constants'
import { parseNotification } from './helpers'
import type { Notification } from './types'

async function fetchNotification() {
  try {
    const notification = await getFromGreenApi<Notification | ''>(
      'receiveNotification',
      {
        params: { receiveTimeout: RECEIVE_TIMEOUT_SECONDS },
        timeout: RECEIVE_REQUEST_TIMEOUT_MS
      }
    )

    return notification || null
  } catch (error) {
    const isEmptyPoll =
      hasStatus(error, HTTP_STATUS.REQUEST_TIMEOUT) || isOfflineError(error)

    if (isEmptyPoll) {
      return null
    }

    throw error
  }
}

export async function receiveNotification() {
  const notification = await fetchNotification()

  if (!notification) {
    return null
  }

  const { receiptId, body } = notification

  return {
    receiptId,
    event: parseNotification(body)
  }
}

export async function deleteNotification(receiptId: number) {
  await deleteFromGreenApi('deleteNotification', receiptId)
}
