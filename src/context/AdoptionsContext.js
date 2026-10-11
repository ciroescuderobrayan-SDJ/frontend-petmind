import { createContext, useContext } from 'react'

export const AdoptionsContext = createContext(null)

export function useAdoptions() {
  const context = useContext(AdoptionsContext)

  if (!context) {
    throw new Error('useAdoptions debe usarse dentro de AdoptionsProvider')
  }

  return context
}
