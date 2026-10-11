import styles from './ProgressBar.module.css'

// Barra de avance (recaudado / meta, pasos del formulario…).
export function ProgressBar({ value = 0, extra = 0, tone = 'primary', size = 'md', label, className = '' }) {
  const width = Math.max(0, Math.min(100, value))
  const extraWidth = Math.max(0, Math.min(100 - width, extra))

  return (
    <div
      className={`${styles.track} ${styles[size]} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width + extraWidth)}
      aria-label={label}
    >
      <span className={`${styles.fill} ${styles[tone]}`} style={{ width: `${width}%` }} />
      {extraWidth > 0 && <span className={styles.extra} style={{ width: `${extraWidth}%` }} />}
    </div>
  )
}

// Barra partida en segmentos (pasos de la solicitud de adopción).
export function SegmentedProgress({ total = 5, done = 0, highlight, tone = 'primary', label }) {
  return (
    <div className={styles.segments} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label}>
      {Array.from({ length: total }, (_, index) => {
        const isDone = index < done
        const isHighlight = highlight !== undefined && index === highlight
        return (
          <span
            key={index}
            className={`${styles.segment} ${isDone ? styles[`segment-${tone}`] : ''} ${isHighlight ? styles.segmentHighlight : ''}`}
          />
        )
      })}
    </div>
  )
}
