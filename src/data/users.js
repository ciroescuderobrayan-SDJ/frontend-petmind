import { daysAgo } from '../utils/dates'

// Usuarios de prueba (contraseña petmind123 para los dos).
export const DEMO_PASSWORD = 'petmind123'

export const interestOptions = ['Adoptar', 'Donar', 'Ser hogar de paso', 'Voluntariado', 'Reportar casos']

export const housingOptions = ['Apartamento', 'Casa', 'Finca']

export const defaultNotificationSettings = {
  requests: true,
  campaigns: true,
  alerts: true,
  newsletter: false,
}

export const initialUsers = [
  {
    id: 'u-brayan',
    accountType: 'persona',
    name: 'Brayan',
    lastName: 'Ciro',
    email: 'brayan.ciro@correo.com',
    password: DEMO_PASSWORD,
    phone: '3001234567',
    city: 'Medellín',
    housing: 'Apartamento',
    interests: ['Adoptar', 'Donar'],
    document: { type: 'CC', number: '1023456482' },
    emailVerified: true,
    homeInfo: true,
    avatar: null,
    notifications: { ...defaultNotificationSettings },
    twoFactor: false,
    passwordUpdatedAt: daysAgo(92),
    alert: { label: 'perros medianos en Medellín', species: 'Perro', size: 'Mediano', city: 'Medellín', lastMatch: daysAgo(1) },
    createdAt: daysAgo(240),
  },
  {
    id: 'u-huellitas',
    accountType: 'fundacion',
    foundationId: 'huellitas-de-amor',
    name: 'Huellitas de Amor',
    lastName: '',
    representative: 'Laura Restrepo',
    email: 'huellitas@correo.com',
    password: DEMO_PASSWORD,
    phone: '6044441234',
    city: 'Medellín',
    nit: '901.234.567-8',
    animals: ['Perros', 'Gatos'],
    emailVerified: true,
    verified: true,
    avatar: null,
    notifications: { ...defaultNotificationSettings },
    twoFactor: true,
    passwordUpdatedAt: daysAgo(30),
    createdAt: daysAgo(900),
  },
]

export function fullName(user) {
  if (!user) return ''
  return [user.name, user.lastName].filter(Boolean).join(' ')
}
