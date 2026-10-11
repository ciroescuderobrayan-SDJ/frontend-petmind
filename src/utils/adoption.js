import { isValidEmail, onlyDigits } from './format'

export const experienceOptions = [
  { value: 'Sí, actualmente', description: 'O hace menos de 2 años' },
  { value: 'Sí, hace tiempo', description: 'Hace más de 2 años' },
  { value: 'Sería la primera vez', description: '¡Te guiamos!' },
]

export const budgetOptions = ['< $100 mil', '$100–200 mil', '+$200 mil']

export const commitmentOptions = [
  { key: 'vaccines', label: 'Mantener sus vacunas y controles veterinarios al día', required: true },
  { key: 'followUp', label: 'Permitir el seguimiento de la fundación durante los primeros 6 meses', required: true },
  { key: 'neverAbandon', label: 'Nunca {abandonarla} y avisar a la fundación si no puedo seguir {cuidandola}', required: true },
  { key: 'photos', label: 'Enviar fotos de su adaptación durante el primer mes' },
]

// "la" / "lo" según el sexo de la mascota.
export function genderize(text, sex) {
  const female = sex === 'Hembra'
  return text
    .replace('{abandonarla}', female ? 'abandonarla' : 'abandonarlo')
    .replace('{cuidandola}', female ? 'cuidándola' : 'cuidándolo')
    .replace('{sola}', female ? 'sola' : 'solo')
    .replace('{la}', female ? 'la' : 'lo')
}

export function defaultAnswers(user) {
  return {
    fullName: user ? `${user.name} ${user.lastName}`.trim() : '',
    docType: user?.document?.type ?? 'CC',
    docNumber: user?.document?.number ?? '',
    birthDate: '',
    occupation: '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
    city: user?.city ?? '',
    address: '',
    motivation: '',
    housingType: user?.housing ?? '',
    housingTenure: '',
    landlordAllows: '',
    people: 1,
    kids: '',
    otherPets: '',
    spacePhotos: [],
    experience: '',
    hoursAlone: 4,
    travelCare: '',
    budget: '',
    commitments: { vaccines: false, followUp: false, neverAbandon: false, photos: false },
    confirm: false,
  }
}

function yearsSince(dateText) {
  const birth = new Date(dateText)
  if (Number.isNaN(birth.getTime())) return 0
  const now = new Date()
  let years = now.getFullYear() - birth.getFullYear()
  if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) years -= 1
  return years
}

// Validación de cada paso del formulario de adopción.
export function validateAdoptionStep(step, answers) {
  const errors = {}
  if (step === 1) {
    if (!answers.fullName.trim()) errors.fullName = 'Escribe tu nombre completo.'
    const doc = onlyDigits(answers.docNumber)
    if (doc.length < 6 || doc.length > 11) errors.docNumber = 'Escribe un documento de 6 a 11 dígitos.'
    if (!answers.birthDate) errors.birthDate = 'Elige tu fecha de nacimiento.'
    else if (yearsSince(answers.birthDate) < 18) errors.birthDate = 'Debes ser mayor de edad para adoptar.'
    if (!answers.occupation.trim()) errors.occupation = 'Cuéntanos a qué te dedicas.'
    const phone = onlyDigits(answers.phone)
    if (phone.length !== 10) errors.phone = 'El celular debe tener 10 dígitos.'
    if (!isValidEmail(answers.email)) errors.email = 'Revisa tu correo.'
    if (!answers.city) errors.city = 'Elige tu ciudad.'
    if (!answers.address.trim()) errors.address = 'Escribe tu barrio y dirección.'
    if (answers.motivation.trim().length < 50) errors.motivation = `Escribe mínimo 50 caracteres (llevas ${answers.motivation.trim().length}).`
  }
  if (step === 2) {
    if (!answers.housingType) errors.housingType = 'Elige el tipo de vivienda.'
    if (!answers.housingTenure) errors.housingTenure = 'Cuéntanos si la vivienda es propia, arrendada o familiar.'
    if (answers.housingTenure === 'Arrendada' && !answers.landlordAllows) errors.landlordAllows = 'Responde si el arrendador permite mascotas.'
    if (!answers.kids) errors.kids = 'Responde si hay niños en casa.'
    if (!answers.otherPets) errors.otherPets = 'Responde si tienes otras mascotas.'
  }
  if (step === 3) {
    if (!answers.experience) errors.experience = 'Elige una opción.'
    if (!answers.travelCare.trim()) errors.travelCare = 'Cuéntanos quién la cuidaría.'
    if (!answers.budget) errors.budget = 'Elige un presupuesto aproximado.'
    const missing = commitmentOptions.filter((item) => item.required && !answers.commitments[item.key])
    if (missing.length) errors.commitments = 'Acepta los tres primeros compromisos para continuar.'
  }
  if (step === 4) {
    if (!answers.confirm) errors.confirm = 'Confirma que la información es verídica.'
  }
  return errors
}

// Puntaje aproximado de compatibilidad que ve la fundación en su tablero.
export function compatibilityScore(answers, pet) {
  let score = 60
  if (answers.experience === 'Sí, actualmente') score += 14
  else if (answers.experience === 'Sí, hace tiempo') score += 9
  else score += 3
  if (answers.hoursAlone <= 4) score += 10
  else if (answers.hoursAlone <= 8) score += 4
  else score -= 6
  if (answers.housingTenure === 'Propia') score += 5
  if (answers.housingTenure === 'Arrendada') score += answers.landlordAllows === 'Sí' ? 4 : answers.landlordAllows === 'No' ? -12 : -2
  if (answers.kids === 'Sí' && pet && !pet.goodWithKids) score -= 10
  if (answers.otherPets === 'Sí' && pet && !pet.goodWithDogs && !pet.goodWithCats) score -= 8
  if (Object.values(answers.commitments).every(Boolean)) score += 5
  if (answers.budget === '+$200 mil') score += 5
  if (answers.budget === '$100–200 mil') score += 3
  return Math.max(40, Math.min(98, score))
}

export function neighborhoodFrom(address = '') {
  return address.split(',')[0].trim()
}

export function applicantFrom(user, answers) {
  return {
    name: answers.fullName,
    initials: answers.fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join(''),
    color: 'primary',
    city: answers.city,
    neighborhood: neighborhoodFrom(answers.address),
    phone: onlyDigits(answers.phone),
    email: answers.email,
    badges: [
      user?.emailVerified ? 'emailVerified' : null,
      answers.experience && answers.experience !== 'Sería la primera vez' ? 'experience' : null,
      answers.housingTenure === 'Arrendada' ? 'rented' : null,
    ].filter(Boolean),
  }
}

export function housingSummary(answers) {
  if (!answers.housingType) return '—'
  const tenure = { Propia: 'propia', Arrendada: 'arrendada', Familiar: 'familiar' }[answers.housingTenure]
  const type = answers.housingType
  const ending = type === 'Casa' || type === 'Finca' ? (tenure === 'arrendada' ? 'arrendada' : tenure) : tenure === 'arrendada' ? 'arrendado' : tenure === 'propia' ? 'propio' : tenure
  return tenure ? `${type} ${ending}` : type
}
