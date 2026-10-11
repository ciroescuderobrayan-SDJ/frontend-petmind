// Fechas en español sin depender de cómo cada navegador abrevia los meses.
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const WEEKDAYS_SHORT = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']

const DAY = 24 * 60 * 60 * 1000

function toDate(value) {
  return value instanceof Date ? value : new Date(value)
}

// Los datos de prueba se calculan contra hoy para que la demo siempre se vea "al día".
export function daysAgo(days, hours = 0, minutes = 0) {
  const date = new Date(Date.now() - days * DAY)
  if (hours || minutes) date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

export function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

export function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString()
}

export function daysFromNow(days, hours = 12, minutes = 0) {
  const date = new Date(Date.now() + days * DAY)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

// Próximo día de la semana (0 = domingo … 6 = sábado) a la hora indicada.
export function nextWeekday(weekday, hours = 10, minutes = 0, minDaysAhead = 1) {
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  let ahead = (weekday - date.getDay() + 7) % 7
  if (ahead < minDaysAhead) ahead += 7
  date.setDate(date.getDate() + ahead)
  return date.toISOString()
}

export function addMonths(value, months) {
  const date = toDate(value)
  const next = new Date(date)
  next.setMonth(date.getMonth() + months)
  return next.toISOString()
}

// "24 sep" · "24 sep 2026"
export function formatDate(value, { year = false } = {}) {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return ''
  const base = `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`
  return year ? `${base} ${date.getFullYear()}` : base
}

// "24 de septiembre de 2026"
export function formatLongDate(value) {
  const date = toDate(value)
  return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
}

// "4:12 p. m."
export function formatTime(value) {
  const date = toDate(value)
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const suffix = hours >= 12 ? 'p. m.' : 'a. m.'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  return `${hour12}:${minutes} ${suffix}`
}

// "24 sep 2026 · 4:12 p. m."
export function formatDateTime(value) {
  return `${formatDate(value, { year: true })} · ${formatTime(value)}`
}

// "lunes 28 sep, 10:00 a. m."
export function formatWeekdayDate(value, { time = true } = {}) {
  const date = toDate(value)
  const base = `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`
  return time ? `${base}, ${formatTime(date)}` : base
}

// "Lunes 28 de septiembre"
export function formatWeekdayLong(value) {
  const date = toDate(value)
  const text = `${WEEKDAYS[date.getDay()]} ${date.getDate()} de ${MONTHS[date.getMonth()]}`
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function weekdayShort(value) {
  return WEEKDAYS_SHORT[toDate(value).getDay()]
}

export function monthShort(value) {
  return MONTHS_SHORT[toDate(value).getMonth()]
}

export function monthName(index) {
  return MONTHS[index]
}

export function monthShortName(index) {
  return MONTHS_SHORT[index]
}

export function dayOfMonth(value) {
  return toDate(value).getDate()
}

// "hace 12 min" · "hace 2 horas" · "ayer" · "hace 3 días" · "24 sep"
export function timeAgo(value) {
  const date = toDate(value)
  const diff = Date.now() - date.getTime()
  const minutes = Math.round(diff / 60000)
  if (minutes < 1) return 'justo ahora'
  if (minutes < 60) return `hace ${minutes} min`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
  const days = Math.round(hours / 24)
  if (days === 1) return 'ayer'
  if (days < 7) return `hace ${days} días`
  if (days < 30) {
    const weeks = Math.round(days / 7)
    return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
  }
  const months = Math.round(days / 30)
  if (months < 12) return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`
  return formatDate(date, { year: true })
}

// Días de calendario que faltan (0 = cierra hoy o ya pasó)
export function daysUntil(value) {
  const end = toDate(value)
  const today = new Date()
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.max(0, Math.round((endDay - startDay) / DAY))
}

export function isFuture(value) {
  return toDate(value).getTime() > Date.now()
}

export function isWithinDays(value, days) {
  const diff = Date.now() - toDate(value).getTime()
  return diff >= 0 && diff <= days * DAY
}

// "Buenos días" · "Buenas tardes" · "Buenas noches"
export function greeting(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

// Para <input type="date">: "2026-10-26"
export function toDateInput(value) {
  const date = toDate(value)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function fromDateInput(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day, 23, 59, 0).toISOString()
}

// Edad en meses → "8 meses" · "1 año" · "5 años"
export function formatAge(months) {
  if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'año' : 'años'}`
}

export function currentYear() {
  return new Date().getFullYear()
}
