import { Link } from 'react-router-dom'
import styles from './PetCard.module.css'

function isRecentlyAdded(createdAt) {
  if (!createdAt) return false

  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return false

  const ageInDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  return ageInDays >= 0 && ageInDays <= 7
}

export default function PetCard({ pet }) {
  if (!pet) return null

  const details = [pet.sex, pet.age, pet.city].filter(Boolean).join(' · ')
  const traits = Array.isArray(pet.traits) ? pet.traits : []
  const showNewBadge = !pet.urgent && isRecentlyAdded(pet.createdAt)

  return (
    <article className={`card ${styles.card}`}>
      <Link
        className={styles.photoLink}
        to={`/adoptar/${pet.id}`}
        aria-label={`Ver perfil de ${pet.name}`}
      >
        <img
          className={styles.photo}
          src={pet.photo}
          alt={`Foto de ${pet.name}`}
          loading="lazy"
        />

        {pet.urgent && (
          <span className={`${styles.badge} ${styles.urgent}`}>
            Urgente
          </span>
        )}

        {showNewBadge && (
          <span className={`${styles.badge} ${styles.new}`}>
            Nuevo
          </span>
        )}
      </Link>

      <div className={`card-body ${styles.body}`}>
        <h3 className={styles.name}>{pet.name}</h3>

        {details && <p>{details}</p>}

        {traits.length > 0 && (
          <div className="chip-list" aria-label="Características">
            {traits.map((trait) => (
              <span className="chip" key={trait}>
                {trait}
              </span>
            ))}
          </div>
        )}

        {pet.foundation && (
          <p className={styles.foundation}>
            Busca hogar con <strong>{pet.foundation}</strong>
          </p>
        )}

        <Link className="btn btn-primary" to={`/adoptar/${pet.id}`}>
          Conocer a {pet.name}
        </Link>
      </div>
    </article>
  )
}