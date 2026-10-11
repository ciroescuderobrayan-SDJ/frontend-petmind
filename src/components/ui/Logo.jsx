import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

// Isotipo de "02 - Recursos gráficos/Logo" dibujado en línea para que cambie de color con el tema.
export function Isotipo({ className, light = false }) {
  const body = light ? '#ffffff' : 'var(--logo-body, #0b6b67)'
  const paw = light ? '#0b6b67' : 'var(--logo-paw, #e8f3f0)'

  return (
    <svg className={className} viewBox="0 0 64 60" aria-hidden="true" focusable="false">
      <path d="M32 58 C20 49 4 38 4 20 C4 10 12 2 22 2 C27 2 30 4.5 32 8 C34 4.5 37 2 42 2 C52 2 60 10 60 20 C60 38 44 49 32 58 Z" fill={body} />
      <ellipse cx="33" cy="33" rx="10" ry="8.5" fill={paw} />
      <ellipse cx="21" cy="22" rx="4.2" ry="5.2" transform="rotate(-18 21 22)" fill={paw} />
      <ellipse cx="29" cy="16.5" rx="4.2" ry="5.4" transform="rotate(-6 29 16.5)" fill={paw} />
      <ellipse cx="38.5" cy="16.5" rx="4.2" ry="5.4" transform="rotate(8 38.5 16.5)" fill={paw} />
      <ellipse cx="46" cy="23" rx="4" ry="5" transform="rotate(22 46 23)" fill={paw} />
      <path
        d="M33 38.5 C31 37 28.5 35.6 28.5 33 C28.5 31.5 29.7 30.4 31 30.4 C31.9 30.4 32.6 30.9 33 31.6 C33.4 30.9 34.1 30.4 35 30.4 C36.3 30.4 37.5 31.5 37.5 33 C37.5 35.6 35 37 33 38.5 Z"
        fill="#F17155"
      />
    </svg>
  )
}

export default function Logo({ to = '/', subtitle = 'Conectamos vidas, cambiamos historias', light = false, size = 'md', className = '' }) {
  const content = (
    <>
      <Isotipo className={styles.mark} light={light} />
      <span className={styles.text}>
        <span className={styles.name}>PetMind</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </span>
    </>
  )

  const classes = `${styles.logo} ${styles[size]} ${light ? styles.light : ''} ${className}`

  if (!to) return <span className={classes}>{content}</span>

  return (
    <Link className={classes} to={to} aria-label="PetMind, ir al inicio">
      {content}
    </Link>
  )
}
