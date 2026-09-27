export const BELARUS_LOCAL_PHONE = /^80(\d{9})$/
export const RUSSIA_LOCAL_PHONE = /^8(\d{10})$/

export const VALID_PHONE = /^(7\d{10}|375\d{9})$/

// Код страны, код оператора или города и семь цифр номера абонента
export const PHONE_PARTS = /^(7|375)(\d+)(\d{3})(\d{2})(\d{2})$/
