import { HTTP_STATUS } from '@/shared/api/http'

export const REQUEST_TIMEOUT_MS = 30_000

export const GREEN_API_STATUS = {
  QUOTA_EXCEEDED: 466,
  CHECK_LIMIT_EXCEEDED: 469
} as const

export const INVALID_CREDENTIALS_MESSAGE =
  'Неверные idInstance или apiTokenInstance'

export const STATUS_MESSAGES: Record<number, string> = {
  [HTTP_STATUS.UNAUTHORIZED]: INVALID_CREDENTIALS_MESSAGE,
  [HTTP_STATUS.TOO_MANY_REQUESTS]:
    'Слишком много запросов, попробуйте чуть позже',
  [GREEN_API_STATUS.QUOTA_EXCEEDED]: 'Превышена квота тарифа GREEN-API',
  [GREEN_API_STATUS.CHECK_LIMIT_EXCEEDED]:
    'Лимит проверок номера исчерпан, повторите через 2 часа'
}

export const ERROR_MESSAGES = {
  unknown: 'Неизвестная ошибка',
  network: 'Нет соединения с сервером GREEN-API',
  timeout: 'Сервер GREEN-API не ответил вовремя'
}

export const MS_IN_SECOND = 1000
