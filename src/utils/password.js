// Reglas de contraseña que muestran Registro y "Crea una nueva contraseña".
export const passwordRules = [
  { id: 'length', label: 'Mínimo 8 caracteres', test: (value) => value.length >= 8 },
  { id: 'upper', label: 'Una mayúscula', test: (value) => /[A-ZÁÉÍÓÚÑ]/.test(value) },
  { id: 'number', label: 'Un número', test: (value) => /\d/.test(value) },
  { id: 'symbol', label: 'Un símbolo (!@#)', test: (value) => /[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]/.test(value) },
]

export function passwordScore(value = '') {
  if (!value) return 0
  return passwordRules.filter((rule) => rule.test(value)).length
}
