import { useQuery } from '@tanstack/react-query'

import { useCredentials } from '@/modules/auth'
import {
  deleteNotification,
  getSettings,
  receiveNotification
} from '@/modules/messages/api'
import {
  isQueryCancelled,
  retryTransient
} from '@/shared/api/http'

import {
  EMPTY_QUEUE_DELAY_MS,
  ERROR_RETRY_DELAY_MS,
  NEXT_NOTIFICATION_DELAY_MS,
  SETTINGS_RECHECK_INTERVAL_MS,
  WEBHOOK_CONFLICT_DELAY_MS
} from './constants'
import {
  applyNotification,
  getReceiveErrorMessage,
  isWebhookConflict
} from './helpers'

export function useIncomingMessages() {
  const { idInstance } = useCredentials()

  const { data: settings } = useQuery({
    queryKey: ['settings', idInstance],
    queryFn: getSettings,
    retry: retryTransient,
    staleTime: Infinity,
    refetchInterval: ({ state }) => {
      const isIncomingDisabled = state.data?.isIncomingEnabled === false

      return isIncomingDisabled
        ? SETTINGS_RECHECK_INTERVAL_MS
        : false
    }
  })

  const { error } = useQuery({
    queryKey: ['notifications', idInstance],
    queryFn: async (context) => {
      const notification = await receiveNotification()

      if (!notification) {
        return null
      }

      if (isQueryCancelled(context)) {
        return null
      }

      if (notification.event) {
        applyNotification(notification.event)
      }

      await deleteNotification(notification.receiptId)

      return notification.receiptId
    },
    refetchInterval: ({ state }) => {
      if (state.status === 'error') {
        return isWebhookConflict(state.error)
          ? WEBHOOK_CONFLICT_DELAY_MS
          : ERROR_RETRY_DELAY_MS
      }

      const isQueueEmpty = state.data === null

      return isQueueEmpty
        ? EMPTY_QUEUE_DELAY_MS
        : NEXT_NOTIFICATION_DELAY_MS
    },
    refetchIntervalInBackground: true,
    networkMode: 'always',
    gcTime: 0
  })

  const isIncomingEnabled = settings?.isIncomingEnabled ?? true

  return {
    errorMessage: getReceiveErrorMessage(error, isIncomingEnabled)
  }
}
