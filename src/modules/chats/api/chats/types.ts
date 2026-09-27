import type { ChatType } from '@/shared/api/greenApi'

export interface ChatSummary {
  chatId: string
  name: string
  type: ChatType
  phoneNumber: number
}
