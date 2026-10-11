import { CampaignsContext } from './CampaignsContext'
import { campaignGoal, fondoPetMind, initialCampaigns } from '../data/campaigns'
import { usePersistentState } from '../hooks/usePersistentState'
import { slugify } from '../utils/format'

export function CampaignsProvider({ children }) {
  const [campaigns, setCampaigns] = usePersistentState('campaigns', initialCampaigns)
  const [fund, setFund] = usePersistentState('fondo', fondoPetMind)

  function getCampaignById(id) {
    if (id === fund.id) return fund
    return campaigns.find((campaign) => campaign.id === id)
  }

  // La meta siempre es la suma de los gastos.
  function addCampaign(data) {
    const campaign = {
      raised: 0,
      donors: 0,
      updates: [],
      receipts: [],
      urgent: false,
      status: 'Activa',
      ...data,
      goal: campaignGoal(data),
      id: `${slugify(data.title) || 'campana'}-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    }
    setCampaigns((prev) => [campaign, ...prev])
    return campaign
  }

  function updateCampaign(id, changes) {
    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id !== id) return campaign
        const next = { ...campaign, ...changes, updatedAt: new Date().toISOString() }
        return { ...next, goal: campaignGoal(next) }
      }),
    )
  }

  function deleteCampaign(id) {
    setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id))
  }

  // Una donación aprobada suma a lo recaudado y al número de donantes.
  function registerDonation(campaignId, amount) {
    const apply = (campaign) => ({ ...campaign, raised: campaign.raised + amount, donors: campaign.donors + 1 })
    if (campaignId === fund.id) {
      setFund((prev) => apply(prev))
      return
    }
    setCampaigns((prev) => prev.map((campaign) => (campaign.id === campaignId ? apply(campaign) : campaign)))
  }

  const value = { campaigns, fund, getCampaignById, addCampaign, updateCampaign, deleteCampaign, registerDonation }

  return <CampaignsContext.Provider value={value}>{children}</CampaignsContext.Provider>
}
