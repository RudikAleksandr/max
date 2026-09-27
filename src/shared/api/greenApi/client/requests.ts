import {
  buildGreenApiUrl,
  getSessionSignal,
  http
} from './http'
import type {
  GreenApiGetConfig,
  GreenApiMethod
} from './types'

export async function getFromGreenApi<T>(
  method: GreenApiMethod,
  { credentials, ...config }: GreenApiGetConfig = {}
) {
  const url = buildGreenApiUrl(method, credentials)
  const signal = getSessionSignal()
  const { data } = await http.get<T>(url, { ...config, signal })

  return data
}

export async function postToGreenApi<T>(method: GreenApiMethod, body: object) {
  const url = buildGreenApiUrl(method)
  const signal = getSessionSignal()
  const { data } = await http.post<T>(url, body, { signal })

  return data
}

export async function deleteFromGreenApi(
  method: GreenApiMethod,
  segment: number
) {
  const url = buildGreenApiUrl(method)
  const signal = getSessionSignal()

  await http.delete(`${url}/${String(segment)}`, { signal })
}
