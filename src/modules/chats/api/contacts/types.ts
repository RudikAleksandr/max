export interface CheckAccountResult {
  exist: boolean
  chatId: string
}

export interface CheckAccountFailure {
  status: false
  reason: string
}

export type CheckAccountResponse = CheckAccountResult | CheckAccountFailure

export interface ContactInfo {
  name: string
  contactName: string
}

export interface AvatarResponse {
  urlAvatar: string
}
