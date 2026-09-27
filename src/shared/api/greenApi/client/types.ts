export interface GreenApiCredentials {
  idInstance: string
  apiTokenInstance: string
}

export interface GreenApiGetConfig {
  params?: Record<string, number>
  timeout?: number
  credentials?: GreenApiCredentials
}

export interface GreenApiSession {
  getCredentials: () => GreenApiCredentials | null
  onUnauthorized: (reason: string) => void
}

export type ChatType = 'user' | 'group' | 'channel' | 'bot'

export type GreenApiMethod =
  | 'checkAccount'
  | 'deleteNotification'
  | 'getAccountSettings'
  | 'getAvatar'
  | 'getChatHistory'
  | 'getChats'
  | 'getContactInfo'
  | 'getSettings'
  | 'getStateInstance'
  | 'receiveNotification'
  | 'sendMessage'

export type StateInstance =
  | 'notAuthorized'
  | 'authorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  | 'pendingPassword'
