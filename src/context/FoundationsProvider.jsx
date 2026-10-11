import { FoundationsContext } from './FoundationsContext'
import { initialFoundations } from '../data/foundations'
import { usePersistentState } from '../hooks/usePersistentState'
import { initials, slugify } from '../utils/format'

export function FoundationsProvider({ children }) {
  const [foundations, setFoundations] = usePersistentState('foundations', initialFoundations)

  function getFoundationById(id) {
    return foundations.find((foundation) => foundation.id === id)
  }

  // Las fundaciones nuevas quedan "en verificación" y no salen en el directorio hasta aprobarse.
  function addFoundation(data) {
    const foundation = {
      photo: '/img/fotos/portada-mujer-abrazando-perro.jpg',
      cover: '/img/fotos/portada-mujer-abrazando-perro.jpg',
      animals: [],
      gallery: [],
      transparency: [],
      reviewsList: [],
      color: 'primary',
      map: { x: 50, y: 50 },
      verified: false,
      stats: { pets: 0, adoptions: 0, campaigns: 0, donations: 0, rating: 0, reviews: 0, stories: 0 },
      ...data,
      id: data.id ?? `${slugify(data.name)}-${Date.now().toString(36)}`,
      initials: initials(data.name),
      since: new Date().getFullYear(),
    }
    setFoundations((prev) => [...prev, foundation])
    return foundation
  }

  function updateFoundation(id, changes) {
    setFoundations((prev) => prev.map((foundation) => (foundation.id === id ? { ...foundation, ...changes } : foundation)))
  }

  const value = { foundations, getFoundationById, addFoundation, updateFoundation }

  return <FoundationsContext.Provider value={value}>{children}</FoundationsContext.Provider>
}
