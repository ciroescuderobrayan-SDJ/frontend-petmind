import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import Avatar from '../ui/Avatar'
import { useFoundations } from '../../context/FoundationsContext'
import { formatNumber } from '../../utils/format'
import styles from './StoryCard.module.css'

const tones = { 'antes-despues': 'primary', video: 'accent', adopcion: 'info', tratamiento: 'warning' }

// Tarjeta de historia (mockup 05 · Historias / 01).
export default function StoryCard({ story, compact = false }) {
  const { getFoundationById } = useFoundations()
  const foundation = getFoundationById(story.foundationId)
  const tone = story.tone ?? tones[story.type] ?? 'primary'
  const url = `/historias/${story.id}`

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <Link to={url} className={styles.media} aria-label={`Leer: ${story.title}`}>
        <img src={story.photo} alt="" loading="lazy" />
        <span className={`${styles.label} ${styles[tone]}`}>{story.label}</span>
        {story.type === 'video' && (
          <>
            <span className={styles.play}>
              <Icon name="play" />
            </span>
            {story.duration && <span className={styles.duration}>{story.duration}</span>}
          </>
        )}
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={url}>{story.title}</Link>
        </h3>
        <p className={styles.excerpt}>{story.excerpt}</p>
        <div className={styles.footer}>
          {foundation && (
            <span className={styles.foundation}>
              <Avatar initials={foundation.initials} color={foundation.color} size="xs" shape="rounded" />
              {foundation.name}
            </span>
          )}
          <span className={styles.likes}>
            <Icon name="heart" /> {formatNumber(story.likes)}
          </span>
        </div>
      </div>
    </article>
  )
}
