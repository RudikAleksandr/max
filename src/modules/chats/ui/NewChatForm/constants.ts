import type {
  CountryData,
  CountryIso2
} from 'react-international-phone'

export const RETRYABLE_ERROR = 'retryable'
export const BLOCKING_ERROR = 'blocking'

export const PHONE_COUNTRIES: CountryData[] = [
  ['Россия', 'ru', '7', '... ... .. ..'],
  ['Беларусь', 'by', '375', '.. ... ....'],
  ['Казахстан', 'kz', '7', '... ... .. ..']
]

export const DEFAULT_COUNTRY: CountryIso2 = 'ru'
