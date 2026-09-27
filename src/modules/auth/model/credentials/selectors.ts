import { useCredentialsStore } from './store'

export function useIsLoggedIn() {
  return useCredentialsStore(({ credentials }) => Boolean(credentials))
}

export function useCredentials() {
  const credentials = useCredentialsStore((state) => state.credentials)

  if (!credentials) {
    throw new Error('Учётные данные запрошены до входа')
  }

  return credentials
}

export function getCredentials() {
  return useCredentialsStore.getState().credentials
}
