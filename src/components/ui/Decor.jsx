import { Link } from 'react-router-dom'
import Icon from './Icon'
import styles from './Decor.module.css'

const confettiColors = ['#0b6b67', '#f17155', '#4f8fc4', '#e3a23b', '#8fd0c4', '#f7b3a4']

// Piezas fijas (no aleatorias) para que el confeti se vea igual en cada render.
// Zonas: borde izquierdo, borde derecho y franja superior, para no tapar el texto.
const pieces = Array.from({ length: 46 }, (_, index) => {
  const zone = index % 3
  const spread = ((index * 37) % 100) / 100
  const depth = ((index * 53) % 90) / 90
  return {
    left: zone === 0 ? 1 + spread * 6 : zone === 1 ? 93 + spread * 6 : 10 + spread * 80,
    top: zone === 2 ? 1 + depth * 9 : 4 + depth * 88,
    rotate: (index * 47) % 180,
    color: confettiColors[index % confettiColors.length],
    size: 0.35 + ((index * 13) % 5) * 0.09,
    round: index % 5 === 0,
    delay: (index % 7) * 0.35,
  }
})

export function Confetti({ className = '' }) {
  return (
    <div className={`${styles.confetti} ${className}`} aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={index}
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.size}rem`,
            height: `${piece.round ? piece.size : piece.size * 1.9}rem`,
            background: piece.color,
            borderRadius: piece.round ? '50%' : '3px',
            transform: `rotate(${piece.rotate}deg)`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Caja punteada con ilustración: "Hay más peludos esperando", "Descubre más mascotas"…
export function EmptyState({ icon = 'paw', illustration = false, title, text, action, actionTo, onAction, children, className = '' }) {
  return (
    <div className={`${styles.empty} ${className}`}>
      {illustration ? (
        <img className={styles.illustration} src="/img/ilustraciones/ilustracion-banner-perro-y-gato.svg" alt="" />
      ) : (
        <span className={styles.emptyIcon}>
          <Icon name={icon} />
        </span>
      )}
      {title && <h3>{title}</h3>}
      {text && <p>{text}</p>}
      {children}
      {action && actionTo && (
        <Link className="btn btn-primary" to={actionTo}>
          {action}
        </Link>
      )}
      {action && onAction && (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  )
}

// Fondo de las pantallas de verificación y recuperación: fotos redondas, puntos y notas a mano.
const scenePhotos = [
  { src: '/img/fotos/mascota-simon-gato.jpg', className: 'photoA' },
  { src: '/img/fotos/mascota-rocky-perro.jpg', className: 'photoB' },
  { src: '/img/fotos/mascota-luna-perra.jpg', className: 'photoC' },
  { src: '/img/fotos/mascota-nala-gata.jpg', className: 'photoD' },
]

export function PetScene({ leftNote, rightNote, children }) {
  return (
    <div className={styles.scene}>
      <div className={styles.sceneDecor} aria-hidden="true">
        {scenePhotos.map((photo) => (
          <img key={photo.className} className={`${styles.scenePhoto} ${styles[photo.className]}`} src={photo.src} alt="" />
        ))}
        <span className={`${styles.sceneDot} ${styles.dotA}`} />
        <span className={`${styles.sceneDot} ${styles.dotB}`} />
        <span className={`${styles.sceneDot} ${styles.dotC}`} />
        <span className={`${styles.sceneDot} ${styles.dotD}`} />
        {leftNote && <span className={`${styles.note} ${styles.noteLeft}`}>{leftNote}</span>}
        {rightNote && (
          <span className={`${styles.note} ${styles.noteRight}`}>
            {rightNote}
          </span>
        )}
      </div>
      <div className={styles.sceneCard}>{children}</div>
    </div>
  )
}

// Ícono grande en recuadro suave con corazón coral (llave, sobre, escudo…)
export function IconBadge({ icon, tone = 'primary', heart = false, size = 'lg' }) {
  return (
    <span className={`${styles.iconBadge} ${styles[`badge-${tone}`]} ${styles[`badge-${size}`]}`}>
      <Icon name={icon} />
      {heart && (
        <span className={styles.badgeHeart}>
          <Icon name="heart-filled" />
        </span>
      )}
    </span>
  )
}
