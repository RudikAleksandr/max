import {
  getFromGreenApi,
  type GreenApiCredentials
} from '@/shared/api/greenApi'

import type { StateInstanceResponse } from './types'

export async function getStateInstance(credentials: GreenApiCredentials) {
  const { stateInstance } = await getFromGreenApi<StateInstanceResponse>(
    'getStateInstance',
    { credentials }
  )

  return stateInstance
}
