import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { resetSession } from '@/shared/lib'

import type { CredentialsState } from './types'

export const useCredentialsStore = create<CredentialsState>()(
  persist(
    (set) => ({
      credentials: null,
      error: null,
      setCredentials: (credentials) => {
        resetSession()

        set({
          credentials,
          error: null
        })
      },
      logout: () => {
        resetSession()

        set({
          credentials: null,
          error: null
        })
      },
      logoutWithError: (error) => {
        resetSession()

        set({
          credentials: null,
          error
        })
      }
    }),
    {
      name: 'max-chat-credentials',
      partialize: ({ credentials }) => ({
        credentials
      })
    }
  )
)
