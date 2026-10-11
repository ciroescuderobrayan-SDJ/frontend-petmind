import { PetsContext } from './PetsContext'
import { initialPets } from '../data/pets'
import { usePersistentState } from '../hooks/usePersistentState'
import { slugify } from '../utils/format'

export function PetsProvider({ children }) {
  const [pets, setPets] = usePersistentState('pets', initialPets)

  function getPetById(id) {
    return pets.find((pet) => pet.id === id)
  }

  // Lo nuevo va de primero para que aparezca arriba en Adoptar y en Mis mascotas.
  function addPet(data) {
    const pet = {
      gallery: [],
      traits: [],
      views: 0,
      questions: [],
      ...data,
      id: `${slugify(data.name) || 'mascota'}-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    }
    if (pet.gallery.length === 0 && pet.photo) pet.gallery = [{ src: pet.photo }]
    setPets((prev) => [pet, ...prev])
    return pet
  }

  function updatePet(id, changes) {
    setPets((prev) => prev.map((pet) => (pet.id === id ? { ...pet, ...changes, updatedAt: new Date().toISOString() } : pet)))
  }

  function deletePet(id) {
    setPets((prev) => prev.filter((pet) => pet.id !== id))
  }

  const value = { pets, getPetById, addPet, updatePet, deletePet }

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>
}
