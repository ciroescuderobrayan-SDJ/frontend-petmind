import { useState } from 'react'
import Icon from './Icon'
import styles from './BeforeAfter.module.css'

// Antes y después. `interactive` agrega el deslizador para comparar (Historias), si no es una vista partida (Inicio).
export default function BeforeAfter({ before, after, interactive = false, rounded = 'lg', className = '' }) {
  const [position, setPosition] = useState(50)

  if (!interactive) {
    return (
      <div className={`${styles.split} ${styles[rounded]} ${className}`}>
        <figure>
          <img src={before.src} alt={`Antes: ${before.label}`} />
          <span className={`${styles.tag} ${styles.tagBefore}`}>{before.label}</span>
        </figure>
        <figure>
          <img src={after.src} alt={`Después: ${after.label}`} />
          <span className={`${styles.tag} ${styles.tagAfter}`}>{after.label}</span>
        </figure>
        <span className={styles.arrow} aria-hidden="true">
          <Icon name="arrow-right" strokeWidth={2.2} />
        </span>
      </div>
    )
  }

  return (
    <div className={`${styles.compare} ${styles[rounded]} ${className}`} style={{ '--position': `${position}%` }}>
      <img className={styles.afterImage} src={after.src} alt={`Después: ${after.label}`} />
      <div className={styles.beforeLayer}>
        <img src={before.src} alt={`Antes: ${before.label}`} />
      </div>
      <span className={`${styles.tag} ${styles.tagBefore}`}>{before.label}</span>
      <span className={`${styles.tag} ${styles.tagAfter} ${styles.tagRight}`}>{after.label}</span>
      <span className={styles.divider} aria-hidden="true">
        <span className={styles.handle}>
          <Icon name="chevron-left" strokeWidth={2.4} />
          <Icon name="chevron-right" strokeWidth={2.4} />
        </span>
      </span>
      <input
        className={styles.range}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Desliza para comparar el antes y el después"
      />
    </div>
  )
}
