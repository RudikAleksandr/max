import { z } from 'zod'

import { isValidPhone } from '@/modules/chats/lib'
import { keepDigits } from '@/shared/lib'

export const newChatSchema = z.object({
  phone: z
    .string()
    .overwrite(keepDigits)
    .min(1, 'Введите номер телефона')
    .refine(isValidPhone, 'Введите номер полностью')
})

export type NewChatFormValues = z.output<typeof newChatSchema>
