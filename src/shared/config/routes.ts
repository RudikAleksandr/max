import { generatePath } from 'react-router'

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  CHAT: '/:chatId?'
} as const

export function getChatPath(chatId: string) {
  return generatePath(ROUTES.CHAT, { chatId })
}
