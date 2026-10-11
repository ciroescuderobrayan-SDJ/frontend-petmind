import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import Avatar from '../ui/Avatar'
import { VerifiedBadge } from '../ui/Badges'
import styles from './FoundationCard.module.css'

// Tarjeta del directorio de fundaciones (mockup 04 · Fundaciones / 01).
export default function FoundationCard({ foundation, stats }) {
  if (!foundation) return null

  const numbers = stats ?? foundation.stats
  const profileUrl = `/fundaciones/${foundation.id}`

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Link to={profileUrl} className={styles.media} aria-label={`Ver perfil de ${foundation.name}`}>
          <img src={foundation.photo} alt="" loading="lazy" />
        </Link>
        <Avatar initials={foundation.initials} color={foundation.color} size="lg" shape="rounded" className={styles.avatar} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={profileUrl}>{foundation.name}</Link>
          {foundation.verified && <VerifiedBadge />}
        </h3>
        <p className={styles.meta}>
          <Icon name="map-pin" /> {foundation.city} · Desde {foundation.since}
        </p>
        <ul className={styles.animals}>
          {foundation.animals.map((animal) => (
            <li key={animal} className="chip">
              {animal}
            </li>
          ))}
        </ul>

        <dl className={styles.stats}>
          <div>
            <dt>mascotas</dt>
            <dd>{numbers.pets}</dd>
          </div>
          <div>
            <dt>adopciones</dt>
            <dd>{numbers.adoptions}</dd>
          </div>
          <div>
            <dt>campañas</dt>
            <dd>{numbers.campaigns}</dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <Link className="btn btn-outline" to={profileUrl}>
            Ver perfil
          </Link>
          <Link className="btn btn-accent-soft" to={`/fundaciones/${foundation.id}?tab=campanas`}>
            <Icon name="heart" /> Donar
          </Link>
        </div>
      </div>
    </article>
  )
}
