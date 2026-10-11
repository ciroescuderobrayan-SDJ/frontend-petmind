import { createContext, useContext } from 'react'

export const PetsContext = createContext(null)

export function usePets() {
  const context = useContext(PetsContext)

  if (!context) {
    throw new Error('usePets debe usarse dentro de PetsProvider')
  }

  return context
}
