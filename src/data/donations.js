import { daysAgo, hoursAgo, minutesAgo } from '../utils/dates'

export const PLATFORM_FEE_RATE = 0.05
export const MIN_DONATION = 10000

export const documentTypes = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'PA', label: 'Pasaporte' },
  { value: 'NIT', label: 'NIT' },
]

export const paymentMethods = [
  { value: 'tarjeta', label: 'Tarjeta de crédito o débito', note: 'Necesaria para donaciones mensuales', brands: ['VISA', 'MC', 'AMEX'] },
  { value: 'pse', label: 'PSE · Débito bancario', note: 'Solo para donaciones de una vez', brands: ['PSE'], oneTimeOnly: true },
  { value: 'billetera', label: 'Billeteras digitales', note: 'Nequi o Daviplata · solo una vez', brands: ['Nequi', 'Daviplata'], oneTimeOnly: true },
]

export const banks = ['Bancolombia', 'Davivienda', 'Banco de Bogotá', 'BBVA', 'Banco de Occidente', 'Nu']

// Historial de Brayan + donaciones recientes de otras personas (para "Donaciones recientes").
export const initialDonations = [
  {
    id: 'DON-88213',
    campaignId: 'toby',
    userId: 'u-brayan',
    donorName: 'Brayan Ciro',
    email: 'brayan.ciro@correo.com',
    amount: 50000,
    fee: 2500,
    total: 52500,
    frequency: 'mensual',
    method: 'tarjeta',
    methodLabel: 'Tarjeta •••• 1234',
    status: 'aprobada',
    subscription: 'activa',
    message: '¡Fuerza, Toby! Pronto vas a volver a correr.',
    anonymous: false,
    showName: true,
    date: daysAgo(14, 17, 48),
  },
  {
    id: 'DON-81450',
    campaignId: 'cirugia-nala',
    userId: 'u-brayan',
    donorName: 'Brayan Ciro',
    email: 'brayan.ciro@correo.com',
    amount: 50000,
    fee: 0,
    total: 50000,
    frequency: 'unica',
    method: 'pse',
    methodLabel: 'PSE · Bancolombia',
    status: 'aprobada',
    anonymous: false,
    showName: true,
    date: daysAgo(57, 11, 20),
  },
  {
    id: 'DON-79902',
    campaignId: 'alimento-60',
    userId: 'u-brayan',
    donorName: 'Brayan Ciro',
    email: 'brayan.ciro@correo.com',
    amount: 20000,
    fee: 0,
    total: 20000,
    frequency: 'unica',
    method: 'billetera',
    methodLabel: 'Nequi',
    status: 'aprobada',
    anonymous: false,
    showName: true,
    date: daysAgo(72, 19, 5),
  },
  {
    id: 'DON-79901',
    campaignId: 'alimento-60',
    userId: 'u-brayan',
    donorName: 'Brayan Ciro',
    email: 'brayan.ciro@correo.com',
    amount: 20000,
    fee: 0,
    total: 20000,
    frequency: 'unica',
    method: 'tarjeta',
    methodLabel: 'Tarjeta •••• 1234',
    status: 'rechazada',
    anonymous: false,
    showName: true,
    date: daysAgo(72, 18, 58),
  },
  {
    id: 'DON-70318',
    campaignId: 'techo-refugio',
    userId: 'u-brayan',
    donorName: 'Brayan Ciro',
    email: 'brayan.ciro@correo.com',
    amount: 30000,
    fee: 0,
    total: 30000,
    frequency: 'unica',
    method: 'pse',
    methodLabel: 'PSE · Davivienda',
    status: 'aprobada',
    anonymous: false,
    showName: true,
    date: daysAgo(161, 10, 0),
  },
  { id: 'DON-88290', campaignId: 'toby', donorName: 'María Camila', initials: 'MC', color: 'primary', amount: 50000, total: 50000, frequency: 'unica', status: 'aprobada', message: '¡Fuerza Toby!', showName: true, date: minutesAgo(12) },
  { id: 'DON-88288', campaignId: 'toby', donorName: 'Anónimo', initials: 'AN', color: 'accent', amount: 200000, total: 200000, frequency: 'unica', status: 'aprobada', anonymous: true, date: hoursAgo(1) },
  { id: 'DON-88271', campaignId: 'toby', donorName: 'Juan Pablo', initials: 'JP', color: 'info', amount: 30000, total: 30000, frequency: 'unica', status: 'aprobada', showName: true, date: hoursAgo(3) },
  { id: 'DON-88177', campaignId: 'toby', donorName: 'Laura R.', initials: 'LR', color: 'purple', amount: 100000, total: 100000, frequency: 'unica', status: 'aprobada', message: 'Que vuelva a correr', showName: true, date: daysAgo(1, 20, 0) },
  { id: 'DON-88302', campaignId: 'cirugia-nala', donorName: 'Sofía M.', initials: 'SM', color: 'green', amount: 40000, total: 40000, frequency: 'unica', status: 'aprobada', message: 'Para la gatita más linda', showName: true, date: hoursAgo(4) },
  { id: 'DON-88250', campaignId: 'alimento-60', donorName: 'Camilo T.', initials: 'CT', color: 'primary', amount: 60000, total: 60000, frequency: 'unica', status: 'aprobada', showName: true, date: hoursAgo(9) },
]

// Donaciones recibidas por mes en el panel de la fundación (millones de pesos, de la más antigua a la actual).
export const monthlyDonationsByFoundation = {
  'huellitas-de-amor': [2.4, 2.9, 3.1, 2.7, 3.5, 3.0, 3.2, 4.1, 3.7, 5.6, 6.1, 6.8],
}

export const monthlyDonationCounts = {
  'huellitas-de-amor': [61, 70, 74, 66, 82, 73, 80, 104, 96, 142, 151, 168],
}
