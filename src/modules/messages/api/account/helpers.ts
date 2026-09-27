import type { InstanceSettings } from './types'

export function parseSettings({ incomingWebhook }: InstanceSettings) {
  return {
    isIncomingEnabled: incomingWebhook !== 'no'
  }
}
