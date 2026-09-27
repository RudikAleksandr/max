import { onlineManager } from '@tanstack/react-query'

import {
  getCredentials,
  logoutOnUnauthorized
} from '@/modules/auth'
import {
  cancelGreenApiRequests,
  connectGreenApiSession
} from '@/shared/api/greenApi'
import { onSessionReset } from '@/shared/lib'

import { queryClient } from './providers'

export function setupApp() {
  onlineManager.setOnline(navigator.onLine)

  connectGreenApiSession({
    getCredentials,
    onUnauthorized: logoutOnUnauthorized
  })

  onSessionReset(() => {
    cancelGreenApiRequests()
    queryClient.clear()
  })
}
