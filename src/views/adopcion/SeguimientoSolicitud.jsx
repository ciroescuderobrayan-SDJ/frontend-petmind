import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import Avatar from '../../components/ui/Avatar'
import { SexBadge, StatusPill, VerifiedBadge } from '../../components/ui/Badges'
import { Breadcrumbs } from '../../components/ui/Navigation'
import NoEncontrada from '../NoEncontrada'
import { useAdoptions } from '../../context/AdoptionsContext'
import { usePets } from '../../context/PetsContext'
import { useFoundations } from '../../context/FoundationsContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { autoReplies, requestDocuments, stageStep } from '../../data/adoptions'
import { sizeLabel } from '../../data/pets'
import { housingSummary } from '../../utils/adoption'
import { dayOfMonth, formatAge, formatDateTime, formatTime, formatWeekdayLong, monthShort } from '../../utils/dates'
import { downloadTextFile } from '../../utils/format'
import styles from './SeguimientoSolicitud.module.css'

function historyDate(request, stage) {
  return request.history?.find((item) => item.stage === stage)?.date
}

// 02 · Adopción / 08 · Seguimiento de la solicitud
export default function SeguimientoSolicitud() {
  const { id } = useParams()
  const { user } = useAuth()
  const { getRequestById, moveRequest, addMessage } = useAdoptions()
  const { getPetById } = usePets()
  const { getFoundationById } = useFoundations()
  const { showToast } = useToast()
  const [message, setMessage] = useState('')
  const [showAnswers, setShowAnswers] = useState(false)
  const [typing, setTyping] = useState(false)
  const chatRef = useRef(null)

  const request = getRequestById(id)
  const messagesCount = request?.messages?.length ?? 0

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messagesCount, typing])

  if (!request || request.userId !== user.id) {
    return <NoEncontrada title="No encontramos esta solicitud" backTo="/cuenta/solicitudes" backLabel="Ver mis solicitudes" />
  }
  if (request.stage === 'borrador') return <Navigate to={`/adoptar/${request.petId}/solicitud?paso=${request.draftStep ?? 1}`} replace />

  const pet = getPetById(request.petId)
  const foundation = getFoundationById(request.foundationId)
  const petName = pet?.name ?? 'tu mascota'
  const finished = ['no-seleccionada', 'cancelada'].includes(request.stage)
  const currentStep = stageStep[request.stage] ?? (finished ? 0 : 1)
  const contactName = request.interview?.with?.split(' ')[0] ?? 'Laura'

  const pill = (() => {
    if (request.stage === 'aprobada') return { tone: 'success', text: 'Aprobada · Paso 5 de 5' }
    if (request.stage === 'no-seleccionada') return { tone: 'danger', text: 'No seleccionada' }
    if (request.stage === 'cancelada') return { tone: 'neutral', text: 'Cancelada' }
    return { tone: 'warning', text: `En proceso · Paso ${currentStep} de 5` }
  })()

  const timeline = [
    {
      icon: 'send',
      title: 'Solicitud enviada',
      date: request.createdAt,
      text: `Recibimos tu solicitud y la enviamos a ${foundation?.name ?? 'la fundación'}.`,
    },
    {
      icon: 'file',
      title: 'Solicitud revisada',
      date: historyDate(request, 'revision') ?? (currentStep > 2 ? request.updatedAt : null),
      text: currentStep > 2 ? `¡Buenas noticias! Tu perfil es compatible con ${petName}.` : 'La fundación está leyendo tus respuestas. Suele tardar de 1 a 3 días.',
    },
    {
      icon: 'video',
      title: 'Entrevista virtual',
      text: currentStep === 3 ? (request.interview ? 'Programada' : 'La fundación te propondrá una fecha') : 'Una videollamada corta para conocerte.',
      interview: currentStep === 3 && request.interview,
    },
    {
      icon: 'home',
      title: 'Visita al hogar',
      text:
        currentStep === 4 && request.visit
          ? `Agendada: ${formatWeekdayLong(request.visit.date)} · ${formatTime(request.visit.date)}`
          : `La fundación coordinará contigo una visita corta a tu ${(request.answers?.housingType ?? 'hogar').toLowerCase()}.`,
    },
    {
      icon: 'heart',
      title: `¡${petName} llega a casa!`,
      text:
        request.stage === 'aprobada' && request.delivery
          ? `Entrega: ${formatWeekdayLong(request.delivery.date)} · ${formatTime(request.delivery.date)} · ${request.delivery.place}`
          : 'Firmas el compromiso de adopción y recibes su carné de vacunas.',
    },
  ]

  function handleCancel() {
    if (!window.confirm(`¿Seguro que quieres cancelar tu solicitud para adoptar a ${petName}?`)) return
    moveRequest(request.id, 'cancelada', { by: user.name })
    showToast('Cancelaste la solicitud. La fundación ya fue notificada.', { tone: 'info' })
  }

  function handleSend(event) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    addMessage(request.id, { from: 'applicant', author: user.name, text })
    setMessage('')
    setTyping(true)
    // La fundación "responde" sola en la demo.
    window.setTimeout(() => {
      addMessage(request.id, { from: 'foundation', author: contactName, text: autoReplies[messagesCount % autoReplies.length] })
      setTyping(false)
    }, 1600)
  }

  function download(doc) {
    downloadTextFile(
      doc.name.replace('.pdf', '.txt'),
      `${doc.name}\n\nPetMind · ${foundation?.name}\nSolicitud #${request.id} para adoptar a ${petName}\n\nDocumento de demostración generado en el navegador.`,
    )
  }

  return (
    <div className="page">
      <title>{`Adopción de ${petName} | PetMind`}</title>

      <div className="container">
        <Breadcrumbs items={[{ label: 'Mi cuenta', to: '/cuenta' }, { label: 'Mis solicitudes', to: '/cuenta/solicitudes' }, { label: `#${request.id}` }]} />

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1>
              Adopción de <span>{petName}</span>
            </h1>
            <StatusPill tone={pill.tone} size="lg">
              {pill.text}
            </StatusPill>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowAnswers((prev) => !prev)} aria-expanded={showAnswers}>
              <Icon name="file" /> {showAnswers ? 'Ocultar mi solicitud' : 'Ver mi solicitud'}
            </button>
            {!finished && request.stage !== 'aprobada' && (
              <button type="button" className="btn btn-danger" onClick={handleCancel}>
                Cancelar solicitud
              </button>
            )}
          </div>
        </div>

        {showAnswers && (
          <section className={`panel ${styles.answers}`}>
            <h2>Tus respuestas</h2>
            <dl>
              <div>
                <dt>¿Por qué quieres adoptar?</dt>
                <dd>{request.answers?.motivation || '—'}</dd>
              </div>
              <div>
                <dt>Vivienda</dt>
                <dd>{housingSummary(request.answers ?? {})}</dd>
              </div>
              <div>
                <dt>Personas en casa</dt>
                <dd>{request.answers?.people ?? '—'}</dd>
              </div>
              <div>
                <dt>Experiencia</dt>
                <dd>{request.answers?.experience ?? '—'}</dd>
              </div>
              <div>
                <dt>Horas sola al día</dt>
                <dd>{request.answers?.hoursAlone ?? '—'}</dd>
              </div>
              <div>
                <dt>Presupuesto</dt>
                <dd>{request.answers?.budget ?? '—'}</dd>
              </div>
            </dl>
          </section>
        )}

        <div className={styles.layout}>
          <section className={`panel ${styles.timelineCard}`}>
            <h2 className={styles.cardTitle}>Estado de tu solicitud</h2>

            {finished && (
              <div className={`alert ${request.stage === 'cancelada' ? 'alert-neutral' : 'alert-error'} ${styles.result}`}>
                <Icon name="info" />
                <span>{request.stage === 'cancelada' ? 'Cancelaste esta solicitud. Puedes enviar una nueva cuando quieras.' : `“${request.result?.message}” — ${request.result?.author}`}</span>
              </div>
            )}

            <ol className={styles.timeline}>
              {timeline.map((item, index) => {
                const number = index + 1
                const done = !finished && number < currentStep
                const current = !finished && number === currentStep
                const state = done ? styles.done : current ? styles.current : styles.pending
                return (
                  <li key={item.title} className={`${styles.event} ${state}`}>
                    <span className={styles.eventIcon}>
                      <Icon name={item.icon} />
                    </span>
                    <div className={styles.eventBody}>
                      <h3>
                        {item.title}
                        {current && <span className={styles.here}>Estás aquí</span>}
                      </h3>
                      {done && item.date && <p className={styles.eventDate}>{formatDateTime(item.date)}</p>}
                      {!done && !current && <p className={styles.eventDate}>Pendiente</p>}
                      <p className={styles.eventText}>{item.text}</p>

                      {item.interview && (
                        <div className={styles.interview}>
                          <span className={styles.calendar}>
                            <span>{monthShort(item.interview.date).toUpperCase()}</span>
                            <strong>{dayOfMonth(item.interview.date)}</strong>
                          </span>
                          <div className={styles.interviewText}>
                            <strong>Entrevista por videollamada</strong>
                            <span>
                              {formatWeekdayLong(item.interview.date)} · {formatTime(item.interview.date)} · {item.interview.duration} min
                            </span>
                            <span>
                              Con {item.interview.with}, {foundation?.name}
                            </span>
                          </div>
                          <div className={styles.interviewActions}>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => showToast('El enlace de la videollamada se activa 10 minutos antes.', { tone: 'info' })}>
                              <Icon name="video" /> Unirme
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                addMessage(request.id, { from: 'applicant', author: user.name, text: '¿Podemos reprogramar la entrevista para otro día?' })
                                showToast('Le pedimos a la fundación una nueva fecha.')
                              }}
                            >
                              Reprogramar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>

          <aside className={styles.aside}>
            {pet && (
              <div className={`panel panel-sm ${styles.petCard}`}>
                <img src={pet.photo} alt={`Foto de ${pet.name}`} />
                <div>
                  <p className={styles.petName}>
                    <strong>{pet.name}</strong> <SexBadge sex={pet.sex} size="sm" />
                  </p>
                  <p className={styles.petMeta}>
                    {formatAge(pet.ageMonths)} · {sizeLabel(pet.size, pet.sex)} · {pet.city}
                  </p>
                  <Link className="link" to={`/adoptar/${pet.id}`}>
                    Ver perfil
                  </Link>
                </div>
              </div>
            )}

            <section className={styles.chat} aria-label={`Chat con ${foundation?.name}`}>
              <header className={styles.chatHeader}>
                <Avatar initials={foundation?.initials} color={foundation?.color} size="md" shape="rounded" />
                <div>
                  <strong>
                    {foundation?.name} {foundation?.verified && <VerifiedBadge />}
                  </strong>
                  <span className={styles.online}>En línea</span>
                </div>
              </header>
              <div className={styles.messages} ref={chatRef}>
                {(request.messages ?? []).length === 0 && <p className={styles.emptyChat}>Escríbele a la fundación si tienes alguna duda sobre {petName}.</p>}
                {(request.messages ?? []).map((item) => (
                  <div key={item.id} className={`${styles.bubble} ${item.from === 'applicant' ? styles.mine : ''}`}>
                    <p>{item.text}</p>
                    <span>{item.from === 'applicant' ? formatTime(item.date) : `${item.author} · ${formatTime(item.date)}`}</span>
                  </div>
                ))}
                {typing && <div className={`${styles.bubble} ${styles.typing}`}>escribiendo…</div>}
              </div>
              <form className={styles.chatForm} onSubmit={handleSend}>
                <label htmlFor="chat-message" className="sr-only">
                  Escribe un mensaje
                </label>
                <input id="chat-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribe un mensaje..." autoComplete="off" />
                <button type="submit" className={styles.send} aria-label="Enviar mensaje" disabled={!message.trim()}>
                  <Icon name="send" />
                </button>
              </form>
            </section>

            <section className={`panel panel-sm ${styles.docs}`}>
              <h2>Documentos del proceso</h2>
              <ul>
                {requestDocuments.map((doc) => (
                  <li key={doc.name}>
                    <span className="icon-tile icon-tile-info">
                      <Icon name="file" />
                    </span>
                    <span className={styles.docName}>{doc.name}</span>
                    <button type="button" className="link-button" onClick={() => download(doc)}>
                      {doc.action}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
