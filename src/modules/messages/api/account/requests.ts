import { getFromGreenApi } from '@/shared/api/greenApi'

import { parseSettings } from './helpers'
import type { InstanceSettings } from './types'

export async function getSettings() {
  const settings = await getFromGreenApi<InstanceSettings>('getSettings')

  return parseSettings(settings)
}
