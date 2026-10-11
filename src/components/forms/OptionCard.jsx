import Icon from '../ui/Icon'
import styles from './OptionCard.module.css'

// Tarjeta de opción única (radio). layout: "row" (ícono + textos + radio), "center" (ícono arriba y texto),
// "plain" (textos + radio, como en "¿Has tenido mascotas antes?").
export function OptionCard({ name, value, checked, onChange, icon, title, description, layout = 'row', tone = 'primary', badge, children, disabled = false, className = '' }) {
  return (
    <label className={`${styles.card} ${styles[layout]} ${styles[tone]} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''} ${className}`}>
      <input type="radio" className="sr-only" name={name} value={value} checked={checked} disabled={disabled} onChange={() => onChange(value)} />
      {badge && <span className={styles.badge}>{badge}</span>}
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
      {layout !== 'center' && <span className={styles.radio} aria-hidden="true" />}
      {children}
    </label>
  )
}
