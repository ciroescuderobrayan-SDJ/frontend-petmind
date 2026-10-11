import { Link, useParams } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import { Confetti } from '../../components/ui/Decor'
import NoEncontrada from '../NoEncontrada'
import { useAdoptions } from '../../context/AdoptionsContext'
import { usePets } from '../../context/PetsContext'
import { useFoundations } from '../../context/FoundationsContext'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../utils/dates'
import styles from './SolicitudEnviada.module.css'

const nextSteps = [
  { icon: 'file', tone: 'primary', title: 'Revisión de tu solicitud', text: 'La fundación lee tus respuestas.', tag: '1 a 3 días' },
  { icon: 'video', tone: 'info', title: 'Entrevista virtual', text: 'Una videollamada corta para conocerte.', tag: 'Te proponen fecha' },
  { icon: 'home', tone: 'accent', title: 'Visita y entrega', text: 'Visitan tu hogar y ¡{name} llega a casa!', tag: 'Aprox. 2 semanas' },
]

// 02 · Adopción / 07 · Solicitud de adopción enviada
export default function SolicitudEnviada() {
  const { id } = useParams()
  const { user } = useAuth()
  const { getRequestById } = useAdoptions()
  const { getPetById } = usePets()
  const { getFoundationById } = useFoundations()

  const request = getRequestById(id)
  if (!request || request.userId !== user.id) return <NoEncontrada title="No encontramos esta solicitud" backTo="/cuenta/solicitudes" backLabel="Ver mis solicitudes" />

  const pet = getPetById(request.petId)
  const foundation = getFoundationById(request.foundationId)

  return (
    <section className={styles.page}>
      <title>Solicitud enviada | PetMind</title>
      <Confetti />

      <div className={`container ${styles.content}`}>
        <div className={styles.avatar}>
          <img src={pet?.photo} alt={pet ? `Foto de ${pet.name}` : ''} />
          <span className={styles.check}>
            <Icon name="check" strokeWidth={3} />
          </span>
        </div>
        <p className={styles.script}>¡{pet?.name} ya sabe que existes!</p>
        <h1 className={styles.title}>
          Tu solicitud fue <span>enviada</span>
        </h1>
        <p className={styles.lead}>
          La Fundación {foundation?.name} la revisará y te contactará pronto. Te avisaremos cada avance por correo y notificaciones.
        </p>
        <p className={styles.reference}>
          Solicitud <strong>#{request.id}</strong> · {formatDate(request.createdAt, { year: true })}
        </p>

        <ol className={styles.steps}>
          {nextSteps.map((step) => (
            <li key={step.title} className={styles.step}>
              <span className={`icon-tile icon-tile-${step.tone}`}>
                <Icon name={step.icon} />
              </span>
              <h2>{step.title}</h2>
              <p>{step.text.replace('{name}', pet?.name ?? 'tu mascota')}</p>
              <span className={`${styles.tag} ${styles[`tag-${step.tone}`]}`}>{step.tag}</span>
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <Link className="btn btn-primary btn-lg" to={`/cuenta/solicitudes/${request.id}`}>
            Ver estado de mi solicitud <Icon name="arrow-right" />
          </Link>
          <Link className="btn btn-secondary btn-lg" to="/adoptar">
            Seguir explorando mascotas
          </Link>
        </div>
      </div>
    </section>
  )
}
