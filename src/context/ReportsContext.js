import { createContext, useContext } from 'react'

export const ReportsContext = createContext(null)

export function useReports() {
  const context = useContext(ReportsContext)

  if (!context) {
    throw new Error('useReports debe usarse dentro de ReportsProvider')
  }

  return context
}
