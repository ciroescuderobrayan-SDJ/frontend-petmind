import { createContext, useContext } from 'react'

export const DonationsContext = createContext(null)

export function useDonations() {
  const context = useContext(DonationsContext)

  if (!context) {
    throw new Error('useDonations debe usarse dentro de DonationsProvider')
  }

  return context
}
