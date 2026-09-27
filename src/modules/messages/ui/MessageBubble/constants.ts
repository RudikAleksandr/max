import type { OutgoingStatus } from '@/modules/messages/model'
import CheckDoubleIcon from '@/shared/assets/icons/check-double.svg?react'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import ClockIcon from '@/shared/assets/icons/clock.svg?react'
import ErrorIcon from '@/shared/assets/icons/error.svg?react'

export const STATUS_ICONS: Record<
  OutgoingStatus,
  { label: string; Icon: typeof CheckIcon }
> = {
  sending: {
    label: 'Отправляется',
    Icon: ClockIcon
  },
  sent: {
    label: 'Отправлено',
    Icon: CheckIcon
  },
  delivered: {
    label: 'Доставлено',
    Icon: CheckIcon
  },
  read: {
    label: 'Прочитано',
    Icon: CheckDoubleIcon
  },
  failed: {
    label: 'Не отправлено',
    Icon: ErrorIcon
  }
}
