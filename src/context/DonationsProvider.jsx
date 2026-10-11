import { DonationsContext } from './DonationsContext'
import { initialDonations } from '../data/donations'
import { usePersistentState } from '../hooks/usePersistentState'

function newReference() {
  return `DON-${Math.floor(10000 + Math.random() * 89999)}`
}

export function DonationsProvider({ children }) {
  const [donations, setDonations] = usePersistentState('donations', initialDonations)

  function getDonationById(id) {
    return donations.find((donation) => donation.id === id)
  }

  function addDonation(data) {
    const donation = {
      status: 'aprobada',
      ...data,
      id: newReference(),
      date: new Date().toISOString(),
    }
    if (donation.frequency === 'mensual' && donation.status === 'aprobada') donation.subscription = 'activa'
    setDonations((prev) => [donation, ...prev])
    return donation
  }

  function updateDonation(id, changes) {
    setDonations((prev) => prev.map((donation) => (donation.id === id ? { ...donation, ...changes } : donation)))
  }

  const value = { donations, getDonationById, addDonation, updateDonation }

  return <DonationsContext.Provider value={value}>{children}</DonationsContext.Provider>
}
