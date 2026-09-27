import { useMutation } from '@tanstack/react-query'

import { getStateInstance } from '@/modules/auth/api'
import {
  getStateError,
  type LoginFormValues,
  useCredentialsStore
} from '@/modules/auth/model'

import { getLoginError } from './helpers'

export function useLogin() {
  const setCredentials = useCredentialsStore((state) => state.setCredentials)

  const { mutateAsync: checkState, isPending } = useMutation({
    mutationFn: getStateInstance
  })

  async function login(values: LoginFormValues) {
    try {
      const instanceState = await checkState(values)
      const stateError = getStateError(instanceState)

      if (stateError) {
        return stateError
      }

      setCredentials(values)

      return null
    } catch (error) {
      return getLoginError(error)
    }
  }

  return {
    login,
    isPending
  }
}
