import {
  format,
  isToday,
  isYesterday,
  startOfDay
} from 'date-fns'
import { ru } from 'date-fns/locale'

import {
  DATE_PATTERN,
  TIME_PATTERN,
  TODAY,
  YESTERDAY
} from './constants'

interface DayGroup<T> {
  day: number
  messages: T[]
}

export function formatTime(timestamp: number) {
  return format(timestamp, TIME_PATTERN)
}

export function formatDay(timestamp: number) {
  if (isToday(timestamp)) {
    return TODAY
  }

  if (isYesterday(timestamp)) {
    return YESTERDAY
  }

  return format(timestamp, DATE_PATTERN, {
    locale: ru
  })
}

export function groupByDay<T extends { timestamp: number }>(messages: T[]) {
  const groups: DayGroup<T>[] = []

  for (const message of messages) {
    const day = startOfDay(message.timestamp).getTime()
    const current = groups.at(-1)

    if (current?.day === day) {
      current.messages.push(message)
    } else {
      groups.push({
        day,
        messages: [message]
      })
    }
  }

  return groups
}
