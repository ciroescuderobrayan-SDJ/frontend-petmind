import Icon from '../ui/Icon'
import styles from './StatTile.module.css'

// Indicador de los paneles: ícono, variación (+3 hoy), valor grande y descripción.
export default function StatTile({ icon, tone = 'primary', value, label, delta }) {
  return (
    <article className={styles.tile}>
      <div className={styles.top}>
        <span className={`icon-tile icon-tile-${tone} ${styles.icon}`}>
          <Icon name={icon} />
        </span>
        {delta && <span className={styles.delta}>{delta}</span>}
      </div>
      <strong className={styles.value}>{value}</strong>
      <span className={styles.label}>{label}</span>
    </article>
  )
}
