import { FavoritesContext } from './FavoritesContext'
import { useAuth } from './AuthContext'
import { usePersistentState } from '../hooks/usePersistentState'

const empty = { pets: [], campaigns: [], foundations: [] }

// Favoritos por usuario: { [userId]: { pets, campaigns, foundations } }
const initialFavorites = {
  'u-brayan': {
    pets: ['luna', 'nala', 'canela', 'max', 'thor'],
    campaigns: ['toby', 'cirugia-nala'],
    foundations: ['huellitas-de-amor'],
  },
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const [favoritesByUser, setFavoritesByUser] = usePersistentState('favorites', initialFavorites)

  const favorites = (user && favoritesByUser[user.id]) || empty

  function isFavorite(type, id) {
    return favorites[type].includes(id)
  }

  // Devuelve false si no hay sesión, para que la página mande a iniciar sesión.
  function toggleFavorite(type, id) {
    if (!user) return false
    setFavoritesByUser((prev) => {
      const current = prev[user.id] ?? empty
      const list = current[type].includes(id) ? current[type].filter((item) => item !== id) : [id, ...current[type]]
      return { ...prev, [user.id]: { ...current, [type]: list } }
    })
    return true
  }

  const value = { favorites, isFavorite, toggleFavorite }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
