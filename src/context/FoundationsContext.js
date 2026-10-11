import { createContext, useContext } from 'react'

export const FoundationsContext = createContext(null)

export function useFoundations() {
  const context = useContext(FoundationsContext)

  if (!context) {
    throw new Error('useFoundations debe usarse dentro de FoundationsProvider')
  }

  return context
}
