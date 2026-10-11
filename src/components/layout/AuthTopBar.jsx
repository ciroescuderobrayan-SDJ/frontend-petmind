import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import styles from './AuthTopBar.module.css'

// Barra de las pantallas de acceso: logo a la izquierda y, a la derecha, un enlace de regreso
// ("← Volver a iniciar sesión") o una pregunta con botón ("¿Ya tienes cuenta? Iniciar sesión").
export default function AuthTopBar({ backTo, backLabel, question, actionTo, actionLabel, children, className = '' }) {
  return (
    <header className={`${styles.bar} ${className}`}>
      <Logo />
      <div className={styles.right}>
        {backTo && (
          <Link className={styles.back} to={backTo}>
            <Icon name="arrow-left" />
            {backLabel}
          </Link>
        )}
        {question && <span className={styles.question}>{question}</span>}
        {actionTo && (
          <Link className={`btn btn-secondary ${styles.action}`} to={actionTo}>
            {actionLabel}
          </Link>
        )}
        {children}
      </div>
    </header>
  )
}
