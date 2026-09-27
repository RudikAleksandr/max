import { z } from 'zod'

import { MAX_MESSAGE_LENGTH } from './constants'

export const messageSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1).max(MAX_MESSAGE_LENGTH)
})

export type MessageFormValues = z.output<typeof messageSchema>
