import { initials as getInitials } from '../../utils/format'
import styles from './Avatar.module.css'

// Avatar con iniciales (HA, BC…) o foto. color: primary · accent · info · purple · warning · green
export default function Avatar({ name = '', initials, src, color = 'primary', size = 'md', shape = 'circle', className = '' }) {
  const text = initials ?? getInitials(name)

  return (
    <span className={`${styles.avatar} ${styles[color]} ${styles[size]} ${styles[shape]} ${className}`} aria-hidden={name ? undefined : true}>
      {src ? <img src={src} alt={name ? `Foto de ${name}` : ''} /> : text}
    </span>
  )
}
