export const EMPTY_QUEUE_DELAY_MS = 2_000
export const NEXT_NOTIFICATION_DELAY_MS = 300
export const ERROR_RETRY_DELAY_MS = 3_000
export const WEBHOOK_CONFLICT_DELAY_MS = 10_000
export const SETTINGS_RECHECK_INTERVAL_MS = 60_000

export const DELAYED_MESSAGE =
  'Новые сообщения задерживаются: GREEN-API не отвечает. Пробуем снова…'

export const WEBHOOK_CONFLICT_MESSAGE =
  'Сообщения не приходят: очистите поле webhookUrl в кабинете GREEN-API'

export const INCOMING_DISABLED_MESSAGE =
  'Сообщения не приходят: включите «Получать уведомления о входящих сообщениях и файлах» в кабинете GREEN-API'
