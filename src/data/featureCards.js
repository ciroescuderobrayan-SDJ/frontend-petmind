import adoptIcon from '../assets/tarjetas/icono-tarjeta-adopta-huella.svg'
import donateIcon from '../assets/tarjetas/icono-tarjeta-dona-corazon.svg'
import foundationsIcon from '../assets/tarjetas/icono-tarjeta-fundaciones-personas.svg'

export const featureCards = [
  {
    id: 'adopta',
    image: adoptIcon,
    title: 'Adopta',
    to: '/adoptar',
    description: 'Encuentra mascotas que esperan un hogar.',
  },
  {
    id: 'dona',
    image: donateIcon,
    title: 'Dona',
    to: '/donar',
    description: 'Apoya tratamientos, rescates y más.',
  },
  {
    id: 'fundaciones',
    image: foundationsIcon,
    title: 'Apoya fundaciones',
    to: '/fundaciones',
    description: 'Conoce organizaciones que hacen la diferencia.',
  },
]
