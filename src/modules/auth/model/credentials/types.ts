import type { GreenApiCredentials } from '@/shared/api/greenApi'

export interface CredentialsState {
  credentials: GreenApiCredentials | null
  error: string | null
  setCredentials: (credentials: GreenApiCredentials) => void
  logout: () => void
  logoutWithError: (error: string) => void
}
