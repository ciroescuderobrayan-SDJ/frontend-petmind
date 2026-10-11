import { onlyDigits } from './format'

// Algoritmo de Luhn: valida que el número de tarjeta sea posible.
export function isValidCardNumber(value) {
  const digits = onlyDigits(value)
  if (digits.length < 13 || digits.length > 19) return false
  let sum = 0
  let double = false
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])
    if (double) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    double = !double
  }
  return sum % 10 === 0
}

export function formatCardNumber(value) {
  return onlyDigits(value)
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatExpiry(value) {
  const digits = onlyDigits(value).slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

export function isValidExpiry(value) {
  const [month, year] = value.split('/').map(Number)
  if (!month || month < 1 || month > 12 || Number.isNaN(year) || value.length !== 5) return false
  const now = new Date()
  const fullYear = 2000 + year
  return fullYear > now.getFullYear() || (fullYear === now.getFullYear() && month >= now.getMonth() + 1)
}

export function cardBrand(value) {
  const digits = onlyDigits(value)
  if (/^4/.test(digits)) return 'VISA'
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'MC'
  if (/^3[47]/.test(digits)) return 'AMEX'
  return ''
}

// En la demo, esta tarjeta simula un pago rechazado por el banco.
export const DECLINED_TEST_CARD = '4000000000000002'
