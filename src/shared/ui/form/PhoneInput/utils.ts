import type { ParsedCountry } from 'react-international-phone'

import {
  EXAMPLE_DIGITS,
  MASK_DIGIT
} from './constants'

export function getMask({ format }: ParsedCountry) {
  return typeof format === 'string'
    ? format
    : ''
}

export function countMaskDigits(mask: string) {
  return mask.split(MASK_DIGIT).length - 1
}

export function getExampleNumber(mask: string) {
  let position = -1

  return mask.replaceAll(MASK_DIGIT, () => {
    position += 1

    return EXAMPLE_DIGITS.charAt(position % EXAMPLE_DIGITS.length)
  })
}
