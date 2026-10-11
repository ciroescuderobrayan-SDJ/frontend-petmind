import { createContext, useContext } from 'react'

export const CampaignsContext = createContext(null)

export function useCampaigns() {
  const context = useContext(CampaignsContext)

  if (!context) {
    throw new Error('useCampaigns debe usarse dentro de CampaignsProvider')
  }

  return context
}
