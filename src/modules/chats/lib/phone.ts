import {
  BELARUS_LOCAL_PHONE,
  PHONE_PARTS,
  RUSSIA_LOCAL_PHONE,
  VALID_PHONE
} from './constants'

export function toInternationalPhone(digits: string) {
  return BELARUS_LOCAL_PHONE.test(digits)
    ? digits.replace(BELARUS_LOCAL_PHONE, '375$1')
    : digits.replace(RUSSIA_LOCAL_PHONE, '7$1')
}

export function isValidPhone(digits: string) {
  return VALID_PHONE.test(digits)
}

function formatPhone(digits: string) {
  return digits.replace(PHONE_PARTS, '+$1 $2 $3-$4-$5')
}

export function displayPhone(digits: string) {
  return isValidPhone(digits)
    ? formatPhone(digits)
    : `+${digits}`
}
