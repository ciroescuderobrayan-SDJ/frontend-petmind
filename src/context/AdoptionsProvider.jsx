import { AdoptionsContext } from './AdoptionsContext'
import { initialRequests, stageLabels } from '../data/adoptions'
import { usePersistentState } from '../hooks/usePersistentState'

const historyText = {
  revision: 'Pasó a revisión',
  entrevista: 'Entrevista agendada',
  visita: 'Visita al hogar agendada',
  aprobada: 'Adopción aprobada',
  'no-seleccionada': 'No seleccionada',
  cancelada: 'Solicitud cancelada',
  nueva: 'Volvió a nuevas',
}

function nextRequestId(requests) {
  const numbers = requests.map((request) => Number(request.id.replace('PM-', ''))).filter(Number.isFinite)
  return `PM-${Math.max(2490, ...numbers) + 1}`
}

export function AdoptionsProvider({ children }) {
  const [requests, setRequests] = usePersistentState('requests', initialRequests)

  function getRequestById(id) {
    return requests.find((request) => request.id === id)
  }

  function update(id, updater) {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...updater(request), updatedAt: new Date().toISOString() } : request)))
  }

  // Borrador automático del formulario de adopción (uno por persona y mascota).
  function saveDraft({ userId, petId, foundationId, applicant, answers, step }) {
    const existing = requests.find((request) => request.stage === 'borrador' && request.userId === userId && request.petId === petId)
    if (existing) {
      update(existing.id, (request) => ({ ...request, answers, draftStep: step, applicant }))
      return existing.id
    }
    const id = nextRequestId(requests)
    const draft = {
      id,
      petId,
      foundationId,
      userId,
      applicant,
      answers,
      stage: 'borrador',
      draftStep: step,
      compatibility: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
      messages: [],
      notes: [],
    }
    setRequests((prev) => [draft, ...prev])
    return id
  }

  function getDraft(userId, petId) {
    return requests.find((request) => request.stage === 'borrador' && request.userId === userId && request.petId === petId)
  }

  // Envía la solicitud: si había borrador lo convierte, si no crea una nueva.
  function submitRequest({ userId, petId, foundationId, applicant, answers, compatibility }) {
    const now = new Date().toISOString()
    const draft = getDraft(userId, petId)
    const id = draft ? draft.id : nextRequestId(requests)
    const request = {
      id,
      petId,
      foundationId,
      userId,
      applicant,
      answers,
      stage: 'nueva',
      compatibility,
      createdAt: now,
      updatedAt: now,
      history: [{ text: 'Solicitud recibida', date: now, stage: 'nueva' }],
      messages: [],
      notes: [],
    }
    setRequests((prev) => [request, ...prev.filter((item) => item.id !== id)])
    return request
  }

  function moveRequest(id, stage, { by = null, ...extra } = {}) {
    update(id, (request) => ({
      ...request,
      ...extra,
      stage,
      history: [...(request.history ?? []), { text: historyText[stage] ?? stageLabels[stage], date: new Date().toISOString(), by, stage }],
    }))
  }

  function deleteRequest(id) {
    setRequests((prev) => prev.filter((request) => request.id !== id))
  }

  function addMessage(id, message) {
    update(id, (request) => ({
      ...request,
      messages: [...(request.messages ?? []), { id: `m-${Date.now()}`, date: new Date().toISOString(), ...message }],
    }))
  }

  function addNote(id, note) {
    update(id, (request) => ({
      ...request,
      notes: [...(request.notes ?? []), { id: `n-${Date.now()}`, date: new Date().toISOString(), ...note }],
    }))
  }

  const value = { requests, getRequestById, saveDraft, getDraft, submitRequest, moveRequest, deleteRequest, addMessage, addNote }

  return <AdoptionsContext.Provider value={value}>{children}</AdoptionsContext.Provider>
}
