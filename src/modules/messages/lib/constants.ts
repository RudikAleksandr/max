export const TODAY = 'Сегодня'
export const YESTERDAY = 'Вчера'
export const DATE_PATTERN = 'd MMMM yyyy'
export const TIME_PATTERN = 'HH:mm'

// Жирный текст MAX приходит в разметке *так*: звёздочки стоят у границы
// слова, а текст между ними не начинается и не заканчивается пробелом
export const BOLD_PATTERN =
  /(?<![\p{L}\p{N}*])\*(?=\S)([^*\n]*?\S)\*(?![\p{L}\p{N}*])/gu
