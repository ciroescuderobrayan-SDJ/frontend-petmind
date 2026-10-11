export const cities = [
  { name: 'Medellín', department: 'Antioquia' },
  { name: 'Envigado', department: 'Antioquia' },
  { name: 'Bello', department: 'Antioquia' },
  { name: 'Itagüí', department: 'Antioquia' },
  { name: 'Sabaneta', department: 'Antioquia' },
  { name: 'Rionegro', department: 'Antioquia' },
  { name: 'Bogotá', department: 'Cundinamarca' },
  { name: 'Cali', department: 'Valle del Cauca' },
  { name: 'Barranquilla', department: 'Atlántico' },
  { name: 'Cartagena', department: 'Bolívar' },
  { name: 'Bucaramanga', department: 'Santander' },
  { name: 'Pereira', department: 'Risaralda' },
  { name: 'Manizales', department: 'Caldas' },
]

export const cityNames = cities.map((city) => city.name)

export const departments = [...new Set(cities.map((city) => city.department))]

export function departmentOf(cityName) {
  return cities.find((city) => city.name === cityName)?.department ?? ''
}
