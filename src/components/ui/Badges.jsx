import Icon from './Icon'
import styles from './Badges.module.css'

// Check azul de "fundación verificada".
export function VerifiedBadge({ size = 'md', label = 'Fundación verificada' }) {
  return (
    <span className={`${styles.verified} ${styles[size]}`} title={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="m7.5 12.3 3 3 6-6.2" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

// ♀ / ♂ junto al nombre de la mascota.
export function SexBadge({ sex, size = 'md' }) {
  const female = sex === 'Hembra'
  return (
    <span className={`${styles.sex} ${female ? styles.female : styles.male} ${styles[size]}`} title={sex}>
      <Icon name={female ? 'female' : 'male'} strokeWidth={2.2} />
      <span className="sr-only">{sex}</span>
    </span>
  )
}

// Etiqueta de estado con punto de color. tone: warning · success · info · neutral · danger · primary · purple
export function StatusPill({ tone = 'neutral', children, dot = true, size = 'md', className = '' }) {
  return (
    <span className={`${styles.pill} ${styles[`pill-${tone}`]} ${styles[`pill-${size}`]} ${className}`}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
