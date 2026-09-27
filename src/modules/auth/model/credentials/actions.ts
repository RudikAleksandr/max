import { useCredentialsStore } from './store'

export function logoutOnUnauthorized(reason: string) {
  const { credentials, logoutWithError } = useCredentialsStore.getState()

  if (!credentials) {
    return
  }

  logoutWithError(reason)
}
