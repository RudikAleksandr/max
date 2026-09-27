import type { StateInstance } from '@/shared/api/greenApi'

export const STATE_ERRORS: Partial<Record<StateInstance, string>> = {
  notAuthorized:
    'Инстанс не авторизован в MAX — привяжите аккаунт в личном кабинете GREEN-API',
  blocked: 'Аккаунт MAX заблокирован',
  starting: 'Инстанс запускается, попробуйте через несколько минут',
  pendingPassword:
    'Авторизация не завершена — введите пароль 2FA в личном кабинете GREEN-API'
}
